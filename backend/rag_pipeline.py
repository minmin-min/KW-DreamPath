# rag_pipeline.py
import os
import json
import psycopg2
import numpy as np
from openai import OpenAI
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# ===== .env 불러오기 =====
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# ===== 기본 설정 =====
OPENAI_MODEL = "gpt-3.5-turbo"  # 필요 시 gpt-4o 등으로 변경 가능
PG_DSN = {
    "host": "localhost",
    "dbname": "KWchatbot",  # ✅ 너희 DB 이름
    "user": "postgres",
    "password": "130802",  # ✅ 너 비밀번호
}
SIM_THRESHOLD = 0.25  # 코사인 유사도 임계값 (낮을수록 더 많은 결과 허용)

# ===== SentenceTransformer (공개 한국어 SBERT 모델) =====
MODEL_PATH = "jhgan/ko-sbert-sts"
model = SentenceTransformer(MODEL_PATH)

# ===== OpenAI 클라이언트 =====
client = OpenAI(api_key=OPENAI_API_KEY)


# ==========================================
# 🔹 Postgres에서 top-3 유사 청크 가져오기
# ==========================================
def _fetch_top3_chunks(query_embedding):
    conn = psycopg2.connect(**PG_DSN)
    cur = conn.cursor()
    cur.execute(
        """
        SELECT dc.chunk_text, dc.chunk_metadata
        FROM embeddings e
        JOIN doc_chunks dc ON e.chunk_id = dc.chunk_id
        WHERE dc.chunk_metadata->>'카테고리' != '공지사항'
        ORDER BY e.embedding <#> %s::vector
        LIMIT 3
        """,
        (query_embedding,),
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


# ==========================================
# 🔹 핵심: RAG 답변 생성 함수
# ==========================================
def generate_answer(user_query, category=None):
    # 1) 공지사항 요청 처리
    if category == ["공지사항"]:
        conn = psycopg2.connect(**PG_DSN)
        cur = conn.cursor()

        cur.execute(
            """
            SELECT 
                chunk_metadata->'기타'->>'제목' AS 제목,
                chunk_metadata->'기타'->>'작성일' AS 작성일,
                chunk_metadata->'기타'->>'첨부파일' AS url
            FROM doc_chunks
            WHERE category = '공지사항'
              AND chunk_index = 0
            ORDER BY (chunk_metadata->'기타'->>'작성일')::date DESC
            LIMIT 5
            """
        )

        rows = cur.fetchall()
        cur.close()
        conn.close()

        if rows:
            notices = []
            for 제목, 작성일, url in rows:
                notices.append({"제목": 제목, "작성일": 작성일, "url": url or "#"})
            return notices
        else:
            return []

    # 2) 쿼리 임베딩 생성
    query_embedding = model.encode(user_query).tolist()

    # 3) DB에서 유사한 청크 top-3 가져오기
    rows = _fetch_top3_chunks(query_embedding)

    # 4) 유사도 임계값 검사
    if not rows:
        return "❗ 관련 정보를 찾지 못했습니다."
    top_texts = [t for (t, _m) in rows]
    qvec = np.array(query_embedding).reshape(1, -1)
    cvecs = model.encode(top_texts)
    sims = cosine_similarity(qvec, cvecs)[0]
    if float(np.max(sims)) < SIM_THRESHOLD:
        return "❗ 해당 주제와 유사한 정보를 찾지 못했습니다."

    # 5) 문맥(context) 구성
    context_items = []
    for i, (text, meta) in enumerate(rows, 1):
        meta_str = (
            json.dumps(meta, ensure_ascii=False) if not isinstance(meta, str) else meta
        )
        context_items.append(f"-----\n본문:\n{text}\n메타데이터:\n{meta_str}")
    context = "\n".join(context_items)

    # 6) LLM 호출
    system = """
    당신은 광운대학교 KW Chatbot입니다.
    아래 CONTEXT의 정보만을 근거로 사용자의 질문에 정확히 답하세요.
    CONTEXT에 없는 정보는 "죄송합니다. 관련 정보를 찾지 못했습니다."라고 답하세요.
    """
    user = f"{context}\n\n질문: {user_query}\n\n정답:"

    try:
        resp = client.chat.completions.create(
            model=OPENAI_MODEL,
            temperature=0.0,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
        )
        return resp.choices[0].message.content
    except Exception as e:
        return f"❗ GPT 응답 중 오류가 발생했습니다: {str(e)}"

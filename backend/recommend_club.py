# ============================================
# 🎯 SBERT 기반 동아리 추천 시스템 (동아리 전용)
# ============================================

import os
import psycopg2
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# ===== .env 불러오기 =====
load_dotenv()

# ===== 기본 설정 =====
PG_DSN = {
    "host": "localhost",
    "dbname": "kwchatbot",
    "user": "postgres",
    "password": "3864"
}
SIM_THRESHOLD = 0.25

# ===== SBERT 모델 =====
MODEL_PATH = "jhgan/ko-sbert-sts"
model = SentenceTransformer(MODEL_PATH)


# ============================================
# 🔹 1️⃣ 동아리 카테고리에서 유사 청크 검색
# ============================================
def _fetch_similar_chunks(query_embedding, top_k=1):
    """
    '동아리' 카테고리에서 사용자 쿼리와 가장 유사한 청크를 찾음
    """
    conn = psycopg2.connect(**PG_DSN)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT 
            dc.doc_id,
            dc.chunk_id,
            dc.chunk_text,
            dc.category,
            1 - (e.embedding <#> %s::vector) AS similarity
        FROM embeddings e
        JOIN doc_chunks dc ON e.chunk_id = dc.chunk_id
        WHERE dc.category = '동아리'              -- ✅ 동아리 카테고리만
        ORDER BY e.embedding <#> %s::vector
        LIMIT %s;
        """,
        (query_embedding, query_embedding, top_k)
    )

    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


# ============================================
# 🔹 2️⃣ 동일 동아리(doc_id)의 모든 청크 가져오기
#      (필요시 chunk_index 필터 조정 가능)
# ============================================
def _fetch_all_chunks_by_doc(doc_id):
    """
    같은 동아리(doc_id)의 모든 청크를 chunk_index 순으로 불러옴
    (현재는 모든 index 사용. 필요하면 특정 index 제외 조건 추가 가능)
    """
    conn = psycopg2.connect(**PG_DSN)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT chunk_index, chunk_text
        FROM doc_chunks
        WHERE doc_id = %s
        ORDER BY chunk_index ASC;
        """,
        (doc_id,)
    )

    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


# ============================================
# 🔹 3️⃣ 추천 함수 (한 동아리 단위)
# ============================================
def recommend_one_club(user_query):
    """
    사용자의 입력 문장을 기반으로 '동아리' 카테고리 내에서
    가장 유사한 1개 동아리(doc_id)를 찾아 모든 청크를 출력
    """
    # 1️⃣ 사용자 입력 임베딩 생성
    query_embedding = model.encode(user_query).tolist()

    # 2️⃣ DB 검색
    rows = _fetch_similar_chunks(query_embedding, top_k=1)
    if not rows:
        return "❗ 관련 동아리 정보를 찾지 못했습니다."

    # 3️⃣ 가장 유사한 동아리의 doc_id 추출
    best_doc_id = rows[0][0]
    best_sim = round(float(rows[0][4]), 4)

    # 4️⃣ 해당 동아리의 모든 청크 가져오기
    chunks = _fetch_all_chunks_by_doc(best_doc_id)
    if not chunks:
        return f"❗ doc_id={best_doc_id} 에 대한 동아리 청크를 찾지 못했습니다."

    # 5️⃣ 동아리 텍스트 통합
    full_text = "\n-----\n".join(
        [f"[{idx}] {txt}" for idx, txt in chunks]
    )

    # 6️⃣ 반환 결과 구성
    result = {
        "추천_동아리_doc_id": best_doc_id,
        "유사도": best_sim,
        "통합_동아리_정보": full_text
    }

    return result


# ============================================
# 🔹 실행 예시
# ============================================
if __name__ == "__main__":
    query = "프로그래밍 동아리에 들어가고 싶어요"
    print(f"\n[사용자 입력] {query}\n")

    rec = recommend_one_club(query)

    if isinstance(rec, str):
        print(rec)
    else:
        print(f"🎯 추천 동아리 (doc_id={rec['추천_동아리_doc_id']}, 유사도={rec['유사도']})\n")
        print(rec["통합_동아리_정보"])

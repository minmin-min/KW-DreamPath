# ============================================
# 📚 SBERT 기반 강의 추천 시스템 (강의정보 전용 + 과목 단위 + index=2 제외)
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

# ===== SBERT 모델 =====
MODEL_PATH = "jhgan/ko-sbert-sts"
model = SentenceTransformer(MODEL_PATH)


# ============================================
# 🔹 1️⃣ 강의정보 카테고리에서 유사 청크 검색
# ============================================
def _fetch_similar_chunks(query_embedding, top_k=1):
    """
    '강의정보' 카테고리에서 사용자 쿼리와 가장 유사한 청크를 찾음
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
        WHERE dc.category = '강의정보'
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
# 🔹 2️⃣ 동일 과목(doc_id)의 모든 청크 가져오기 (단, index=2 제외)
# ============================================
def _fetch_all_chunks_by_doc(doc_id):
    """
    같은 과목(doc_id)의 모든 청크를 chunk_index 순으로 불러옴
    단, chunk_index=2인 청크는 제외
    """
    conn = psycopg2.connect(**PG_DSN)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT chunk_index, chunk_text
        FROM doc_chunks
        WHERE doc_id = %s
          AND chunk_index != 2
        ORDER BY chunk_index ASC;
        """,
        (doc_id,)
    )

    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


# ============================================
# 🔹 3️⃣ 추천 함수 (한 과목 단위)
# ============================================
def recommend_one_course(user_query):
    """
    '강의정보' 카테고리 내에서 가장 유사한 1개 과목(doc_id)을 찾아
    모든 청크(단, index≠2)를 출력
    """
    # 사용자 문장 임베딩
    query_embedding = model.encode(user_query).tolist()

    # 가장 유사한 청크 1개
    rows = _fetch_similar_chunks(query_embedding, top_k=1)
    if not rows:
        return " 관련 강의 정보를 찾지 못했습니다."

    # 해당 청크가 속한 강의의 doc_id 선택
    best_doc_id = rows[0][0]
    best_sim = round(float(rows[0][4]), 4)

    # 동일 강좌의 전체 청크 가져오기 (index 2 제외)
    chunks = _fetch_all_chunks_by_doc(best_doc_id)
    if not chunks:
        return f" doc_id={best_doc_id} 에 대한 청크를 찾지 못했습니다."

    # 텍스트 결합
    full_text = "\n-----\n".join(
        [f"[{idx}] {txt}" for idx, txt in chunks]
    )

    # 결과 반환
    return {
        "추천_강의_doc_id": best_doc_id,
        "유사도": best_sim,
        "통합_강의_정보": full_text
    }


# ============================================
# 🔹 실행 예시
# ============================================
if __name__ == "__main__":
    query = "회계사 되고싶어요"
    print(f"\n[사용자 입력] {query}\n")

    rec = recommend_one_course(query)

    if isinstance(rec, str):
        print(rec)
    else:
        print(f" 추천 강의 (doc_id={rec['추천_강의_doc_id']}, 유사도={rec['유사도']})\n")
        print(rec["통합_강의_정보"])

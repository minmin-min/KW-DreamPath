# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from rag_pipeline import generate_answer

app = FastAPI()

# 🔹 CORS 설정 (React, Streamlit 등 외부 접근 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 필요하면 나중에 도메인 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 요청 형식 정의
class QueryRequest(BaseModel):
    query: str
    category: Optional[List[str]] = None

# 🔹 일반 RAG 질문용 엔드포인트
@app.post("/rag")
def rag_handler(req: QueryRequest):
    result = generate_answer(req.query, req.category)
    return {"answer": result}

# 🔹 공지사항용 엔드포인트 (필요 시)
@app.get("/notice")
def notice_handler():
    result = generate_answer("공지사항 요청", category=["공지사항"])
    return {"answer": result}

# 🔹 서버 상태 확인용
@app.get("/")
def root():
    return {"status": "KW Chatbot backend running ✅"}

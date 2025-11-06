from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import generate_answer

app = FastAPI()

# ✅ CORS 설정 (프론트에서 접근 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 필요시 프론트 주소로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 요청 모델
class QueryRequest(BaseModel):
    query: str
    category: Optional[List[str]] = None

# ✅ RAG 엔드포인트
@app.post("/rag")
def rag_handler(req: QueryRequest):
    result = generate_answer(req.query, req.category)
    return {"answer": result}

# ✅ 테스트용 (선택)
@app.get("/status")
def status():
    return {"status": "KW Chatbot backend running ✅"}

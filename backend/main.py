from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, List
from rag_pipeline import generate_answer

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청 모델
class QueryRequest(BaseModel):
    query: str
    category: Optional[List[str]] = None

@app.post("/rag")
def rag_handler(req: QueryRequest):
    result = generate_answer(req.query, req.category)
    return {"answer": result}

@app.get("/notice")
def notice_handler():
    result = generate_answer("공지사항 요청", category=["공지사항"])
    return {"answer": result}

@app.get("/status")
def status():
    return {"status": "KW Chatbot backend running ✅"}

# ✅ React 정적 파일 연결
frontend_dir = Path(__file__).resolve().parent.parent / "frontend" / "dist"

if not frontend_dir.exists():
    raise RuntimeError(f"❌ React build 폴더를 찾을 수 없습니다: {frontend_dir}")

app.mount("/assets", StaticFiles(directory=frontend_dir / "assets"), name="assets")

@app.get("/{full_path:path}")
def react_router(full_path: str):
    return FileResponse(frontend_dir / "index.html")

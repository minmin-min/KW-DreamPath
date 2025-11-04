// src/api/chat.js
export async function askChatbot(question) {
  const res = await fetch("http://127.0.0.1:8000/rag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: question }),
  });

  if (!res.ok) throw new Error("서버 연결 실패");
  const data = await res.json();
  return data.answer;
}

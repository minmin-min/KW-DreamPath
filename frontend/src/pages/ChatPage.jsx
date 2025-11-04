// src/pages/ChatPage.jsx
import { useState } from "react";
import { askChatbot } from "../api/chat";

function ChatPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!input.trim()) return;
    const answer = await askChatbot(input);
    setResponse(answer);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">KW Chatbot 💬</h1>

      <textarea
        className="w-1/2 h-24 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
        placeholder="질문을 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        질문하기
      </button>

      <div className="w-1/2 mt-6 p-4 bg-white border rounded-lg shadow">
        <h2 className="font-semibold mb-2">답변:</h2>
        <p>{response || "아직 답변이 없습니다."}</p>
      </div>
    </div>
  );
}

export default ChatPage;

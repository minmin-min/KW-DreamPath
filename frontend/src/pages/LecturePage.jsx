import React, { useState } from "react";
import axios from "axios";

function ChatBox({ title }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: `궁금한 점을 입력해주세요 :)` },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ FastAPI 백엔드 주소 (필요 시 IP 수정)
  const API_URL = "http://127.0.0.1:8000/rag";

  // 메시지 전송 함수
  const handleSend = async () => {
    if (!question.trim()) return;
    const userMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      // ✅ FastAPI 서버에 POST 요청 보내기
      const response = await axios.post(API_URL, {
        query: question,
        category: [title], // 강의, 동아리, 취업 등 페이지 이름에 따라 자동 설정됨
      });

      const botMsg = {
        sender: "bot",
        text: response.data.answer || "서버에서 응답이 없습니다.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("❌ 서버 연결 실패:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "서버 연결에 실패했습니다. (백엔드 실행 중인지 확인해주세요)" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter 키 입력
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col w-full max-w-3xl bg-white shadow-lg rounded-2xl mt-10 p-6">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        {title} 챗봇
      </h2>
      <div className="flex flex-col space-y-3 overflow-y-auto h-[450px] p-3 border rounded-lg bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-xl max-w-[70%]`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-400 text-sm">
            답변을 불러오는 중...
          </div>
        )}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="궁금한 점을 입력해주세요"
          className="flex-1 border p-2 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          보내기
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

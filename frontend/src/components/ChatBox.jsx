import React, { useState, useRef, useEffect } from "react";
import mascot from "../assets/mascot.png";
import sendIcon from "../assets/send.png";
import { sendQuestion } from "../api/request.jsx"; // ✅ 백엔드 통합 파일 연결

function ChatBox({ title }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "궁금한 점을 입력해주세요 :)" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ 메시지 전송 (백엔드 연결)
  const handleSend = async () => {
    if (input.trim() === "") return;

    // 사용자 메시지 추가
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    const question = input;
    setInput("");
    setLoading(true);

    // 🔹 FastAPI 서버로 요청 보내기
    const answer = await sendQuestion(question, title);

    // 봇 응답 추가
    setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    setLoading(false);
  };

  // Enter 키로 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // 스크롤 항상 맨 아래로
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="w-8/12 h-[650px] bg-white rounded-b-[30px] 
      shadow-lg p-6 relative flex flex-col items-center"
    >
      {/* 채팅창 */}
      <div className="mt-6 w-full h-[480px] px-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mb-6 ${
              msg.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.sender === "bot" ? (
              <div className="flex items-center space-x-3 ml-[-10px]">
                {/* 마스코트 */}
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={mascot}
                    alt="마스코트"
                    className="w-[55px] h-auto mb-[0.5px] object-contain"
                  />
                  <div className="w-[45px] border-b-2 border-black mb-[0.5px]"></div>
                  <p className="text-[12px] font-semibold text-gray-800">
                    {title}
                  </p>
                </div>

                {/* 챗봇 말풍선 */}
                <div className="bg-[#F4D2D2] text-gray-900 px-4 py-2 rounded-2xl rounded-tl-none shadow flex items-center">
                  {msg.text}
                </div>
              </div>
            ) : (
              /* 사용자 말풍선 */
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl rounded-tr-none shadow flex items-center">
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 로딩 메시지 */}
        {loading && (
          <div className="flex justify-start mb-6 ml-10 text-gray-500 text-sm">
            답변을 불러오는 중입니다...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 입력창 */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
        flex items-center justify-between w-[90%] h-[45px]"
      >
        {/* 입력 필드 */}
        <div className="flex items-center w-[93%] h-full border border-gray-800 rounded-md shadow-md bg-white px-4">
          <input
            type="text"
            placeholder="궁금한 점을 입력해주세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow outline-none text-gray-800 text-[15px] bg-transparent"
          />
        </div>

        {/* 전송 버튼 */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`ml-1 flex justify-center items-center w-[42px] h-[42px] 
          bg-white border border-gray-800 rounded-full shadow-md transition-transform
          ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
        >
          <img src={sendIcon} alt="전송" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

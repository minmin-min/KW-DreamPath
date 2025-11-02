import React, { useState, useRef, useEffect } from "react";
import mascot from "../assets/mascot.png";
import sendIcon from "../assets/send.png";

function ChatBox({ title }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "궁금한 점을 입력해주세요 :)" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "좋은 질문이에요! 잠시만요 :)" },
      ]);
    }, 800);
  };

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
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow outline-none text-gray-800 text-[15px] bg-transparent"
          />
        </div>

        {/* 전송 버튼 */}
        <button
          onClick={handleSend}
          className="ml-1 flex justify-center items-center w-[42px] h-[42px] 
          bg-white border border-gray-800 rounded-full shadow-md hover:scale-105 
          transition-transform"
        >
          <img src={sendIcon} alt="전송" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

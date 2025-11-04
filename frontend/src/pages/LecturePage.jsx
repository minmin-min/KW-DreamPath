// src/pages/LecturePage.jsx
import React from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

function LecturePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      {/* 상단 헤더 */}
      <Header />

      {/* ChatBox (백엔드와 자동 연동됨) */}
      <ChatBox title="강의" />
    </div>
  );
}

export default LecturePage;


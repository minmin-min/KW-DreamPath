// src/pages/JobPage.jsx
import React from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

function JobPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      {/* 상단 헤더 */}
      <Header />

      {/* ChatBox 컴포넌트 (백엔드와 연동됨) */}
      <ChatBox title="취업 정보" />
    </div>
  );
}

export default JobPage;


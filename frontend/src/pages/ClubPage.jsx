// src/pages/ClubPage.jsx
import React from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

function ClubPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      {/* 상단 헤더 */}
      <Header />

      {/* ChatBox 컴포넌트 (백엔드와 연동됨) */}
      <ChatBox title="동아리" />
    </div>
  );
}

export default ClubPage;


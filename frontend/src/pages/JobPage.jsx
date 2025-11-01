import React from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

function JobPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      <Header />
      <ChatBox title="취업 정보" />
    </div>
  );
}

export default JobPage;

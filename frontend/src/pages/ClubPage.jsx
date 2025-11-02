import React from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

function ClubPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      <Header />
      <ChatBox title="동아리" />
    </div>
  );
}

export default ClubPage;

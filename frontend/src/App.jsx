import React from "react";
import { Routes, Route } from "react-router-dom";

// 메인 페이지
import MainPage from "./pages/mainpage";

// 세부 페이지
import LecturePage from "./pages/LecturePage";
import ClubPage from "./pages/ClubPage";
import JobPage from "./pages/JobPage";

// ✅ 새로 추가한 페이지
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/lecture" element={<LecturePage />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/job" element={<JobPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;

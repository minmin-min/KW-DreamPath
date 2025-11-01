import React from "react";
import { Routes, Route } from "react-router-dom";
import LecturePage from "./pages/LecturePage";
import ClubPage from "./pages/ClubPage";
import JobPage from "./pages/JobPage";

// 팀원의 시작 화면 (임시용)
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#800000]">광운대학교 챗봇</h1>
      <div className="space-x-4">
        <a href="/lecture" className="px-4 py-2 bg-[#800000] text-white rounded-lg">강의 정보</a>
        <a href="/club" className="px-4 py-2 bg-[#800000] text-white rounded-lg">동아리 정보</a>
        <a href="/job" className="px-4 py-2 bg-[#800000] text-white rounded-lg">취업 정보</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lecture" element={<LecturePage />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/job" element={<JobPage />} />
    </Routes>
  );
}

export default App;

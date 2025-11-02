import React from "react";
import { Routes, Route } from "react-router-dom";

// 메인 페이지
import MainPage from "./pages/mainpage";

// 세부 페이지
import LecturePage from "./pages/LecturePage";
import ClubPage from "./pages/ClubPage";
import JobPage from "./pages/JobPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/lecture" element={<LecturePage />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/job" element={<JobPage />} />
    </Routes>
  );
}

export default App;

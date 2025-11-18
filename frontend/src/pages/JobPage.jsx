// src/pages/JobPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import LectureSection from "../components/LectureSection";
import ClubSection from "../components/ClubSection";
import EtcSection from "../components/EtcSection";
import DetailModal from "../components/DetailModal";

function JobPage() {

  const [query, setQuery] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const handleOpen = (data) => {
    setDetailData(data);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchSubmit(query);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">

      {/* 헤더 */}
      <Header />

      {/* ⭐ ClubPage의 ChatBox와 동일한 카드형 컨테이너 */}
      <div className="
        w-8/12 
        bg-white 
        shadow-lg 
        rounded-b-[30px]
        px-10 pt-10 pb-10 
        flex flex-col
        items-start
      ">

        {/* 검색 바 */}
        {/* 🎯 첫 번째 간격: mb-12 유지 */}
        <div className="w-full mb-12"> 
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearchSubmit}
          />
        </div>

        {/* 강의 추천, 동아리 추천, 기타 정보 섹션들을 감싸는 컨테이너 */}
        {/* 🎯 두 번째/세 번째 간격: space-y-12 유지 */}
        <div className="w-full flex flex-col space-y-12"> 
          <LectureSection
            onSelect={handleOpen}
            filter={searchSubmit}
          />
        

        {/* 동아리 추천 */}
          <ClubSection
            onSelect={handleOpen}
            filter={searchSubmit}
          />
        

        {/* 기타 정보 */}
       
          <EtcSection filter={searchSubmit} />
        </div>

      </div>

      {/* 상세 모달 */}
      {openModal && (
        <DetailModal
          data={detailData}
          onClose={handleClose}
        />
      )}

    </div>
  );
}

export default JobPage;
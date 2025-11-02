import React from "react";
import kw_logo from "./assets/kw_logo.png";
import kw_circle from "./assets/kw_circle.png";
import wooni from "./assets/wooni.png";
import lecture from "./assets/lecture.png";
import friends from "./assets/friends.png";
import job from "./assets/job.png";

const MainPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-50 font-sans">
      {/* 상단 헤더 */}
      <div
        className={`w-8/12 mt-[30px] bg-[#840E1E] text-white text-center py-[18px] text-[28px] font-bold 
        flex justify-center items-center space-x-[14px] shadow-md rounded-t-[35px]`}
      >
        <img src={kw_circle} alt="kw_circle" className="w-[60px] h-[60px]" />
        <span>광운대학교</span>
      </div>

      {/* 소개 박스 */}
      <section
        className={`bg-red-100 mt-[25px] px-[32px] py-[24px] rounded-b-[20px] shadow-md 
        flex items-center justify-start w-8/12`}
      >
        <img src={wooni} alt="Wooni" className="w-[110px] mr-[20px]" />
        <div className="text-[#840E1E] text-[18px] leading-relaxed">
          <p>안녕하세요.</p>
          <p>
            광운대학교 전공 도우미 <b>KW Dreampath</b>입니다.
          </p>
          <p>아래 카테고리를 클릭하셔서 챗봇과 대화해보세요!</p>
        </div>
      </section>

      {/* 카테고리 버튼 */}
      <div className="flex justify-center mt-[70px] w-8/12 space-x-[200px]">
        {/* 강의 */}
        <button
          onClick={() => (window.location.href = "/lecture")}
          className={`w-[200px] h-[200px] bg-white border-2 border-[#840E1E] rounded-[15px] 
          shadow-md flex flex-col items-center justify-center 
          hover:scale-105 transition-transform p-[10px]`}
        >
          <img src={lecture} alt="Lecture" className="w-[50px] mb-[8px]" />
          <span className="text-[#840E1E] font-semibold text-[20px]">강의</span>
        </button>

        {/* 동아리 */}
        <button
          onClick={() => (window.location.href = "/club")}
          className={`w-[200px] h-[200px] bg-white border-2 border-[#840E1E] rounded-[15px] 
          shadow-md flex flex-col items-center justify-center 
          hover:scale-105 transition-transform p-[10px]`}
        >
          <img src={friends} alt="Club" className="w-[50px] mb-[8px]" />
          <span className="text-[#840E1E] font-semibold text-[20px]">동아리</span>
        </button>

        {/* 취업 */}
        <button
          onClick={() => (window.location.href = "/job")}
          className={`w-[200px] h-[200px] bg-white border-2 border-[#840E1E] rounded-[15px] 
          shadow-md flex flex-col items-center justify-center 
          hover:scale-105 transition-transform p-[10px]`}
        >
          <img src={job} alt="Job" className="w-[50px] mb-[8px]" />
          <span className="text-[#840E1E] font-semibold text-[20px]">취업 정보</span>
        </button>
      </div>

      {/* 하단 로고 */}
      <div className="w-8/12 flex justify-end mt-[80px] mb-[30px]">
        <img src={kw_logo} alt="kw_logo" className="w-[170px]" />
      </div>
    </div>
  );
};

export default MainPage;

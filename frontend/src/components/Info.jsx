// frontend/src/components/Info.jsx
import React from "react";
import mascot from "../assets/mascot.png";

function Info() {
  return (
    <div className="w-8/12 bg-white shadow-md font-sans">
      
      {/* 1. 마스코트 메시지 부분 */}
      <div className="flex justify-start items-center space-x-3 p-8 pb-4"> 
        {/* 마스코트 이미지 */}
        <img 
          src={mascot} 
          alt="마스코트" 
          className="w-[120px] h-[120px] object-contain flex-shrink-0" 
        />

        {/* 메시지 박스 */}
        <div className="flex-1">
          <div
            className="bg-red-100/70 border-l-4 border-[#840E1E] p-4 text-gray-800 
            text-[18px] rounded-lg shadow-sm"
          >
            <p className="font-semibold">
              관심있는 분야 또는 직업을 알려주세요
            </p>
            <p className="mt-1">
              꿈에 조금 더 가까워질 수 있게 도와드릴게요
            </p>
          </div>
        </div>
      </div>
      
      {/* 2. 검색 입력 필드 부분 */}
      <div className="px-16 py-8 pt-0">
        <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-inner">
          <input
            type="text"
            placeholder="어떤 직업에 대해 로드맵을 추천해 드릴까요?"
            className="w-full py-2 pl-4 pr-12 text-[18px] text-gray-700 focus:outline-none"
            defaultValue="" 
          />
          <button
            className="absolute right-0 top-0 h-full w-12 flex items-center 
            justify-center text-gray-500 hover:text-[#840E1E] transition-colors"
          >
            {/* 돋보기 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" 
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Info;
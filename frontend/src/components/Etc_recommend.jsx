// frontend/src/components/Etc_recommend.jsx
import React from "react";

// 직업 데이터 하드코딩
const relatedJobs = [
    "정보 시스템 운영자",
    "데이터 분석가 (빅데이터 분석가)",
];

function Etc_recommend() {
  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md rounded-b-[35px] font-sans">
      <div className="flex items-center space-x-3 mb-6 border-t pt-4">
        <h2 className="text-lg font-bold text-[#840E1E]">
          별첨. 관심 분야와 관련된 직업을 확인해보세요
        </h2>
      </div>

      <div className="flex space-x-4">
        {relatedJobs.map((job, index) => (
          <button
            key={index}
            className="px-6 py-2 border border-gray-400 rounded-full 
            text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
          >
            {job}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Etc_recommend;
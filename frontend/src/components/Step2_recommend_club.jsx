// frontend/src/components/Step2_recommend_club.jsx
import React from "react";
import step2_sprout from "../assets/step2_sprout.png"; 
import mascot from "../assets/mascot.png";

// 활동 카드 공통 스타일
// **수정: border-gray-300 -> border-[#840E1E]로 변경**
const cardStyle = "w-full bg-white border border-[#840E1E] rounded-lg p-4 shadow-sm relative h-[180px]";

function Step2_recommend_club() {
  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md font-sans">
      <div className="flex items-center space-x-3 mb-6">
        <img src={step2_sprout} alt="2단계 아이콘" className="w-8 h-8" />
        <h2 className="text-xl font-bold text-gray-800">
          2단계. 학교 활동으로 관련 지식을 쌓고 인맥을 형성해보세요
        </h2>
      </div>

      <div className="flex space-x-6">
        {/* 동아리 카드 */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">동아리</h3>
          <div className={cardStyle}>
            <p className="text-lg font-bold text-gray-800 mb-2 text-center">로빛</p>
            <p className="text-sm text-gray-600">분야:</p>
            <p className="text-sm text-gray-600">동아리 소개:</p>
            <img 
                src={mascot}
                alt="마스코트" 
                className="absolute bottom-1 right-2 w-8 h-auto opacity-70"
            />
          </div>
        </div>

        {/* 학부연구생 카드 */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">학부연구생</h3>
          <div className={cardStyle}>
            <p className="text-lg font-bold text-gray-800 mb-2 text-center">RAIL</p>
            <p className="text-sm text-gray-600">교수:</p>
            <p className="text-sm text-gray-600">분야:</p>
            <img 
                src={mascot}
                alt="마스코트" 
                className="absolute bottom-1 right-2 w-8 h-auto opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2_recommend_club;
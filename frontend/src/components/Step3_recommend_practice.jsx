// frontend/src/components/Step3_recommend_practice.jsx
import React from "react";
import step3_tree from "../assets/step3_tree.png";

function Step3_recommend_practice() {
  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md font-sans">
      <div className="flex items-center space-x-3 mb-6">
        <img src={step3_tree} alt="3단계 아이콘" className="w-8 h-8" />
        <h2 className="text-xl font-bold text-gray-800">
          3단계. 국민내일배움카드 훈련과정으로 취업 준비를 해보세요
        </h2>
      </div>

      {/* 훈련 과정 카드 */}
      <div 
        className="w-1/2 bg-white border border-gray-300 rounded-lg p-4 
        shadow-sm hover:shadow-md transition-shadow"
      >
        <p className="text-lg font-bold text-gray-800 mb-2">
            컴퓨터 활용능력(1급) 자격 취득반
        </p>
        <p className="text-sm text-gray-600">주소:</p>
        <p className="text-sm text-gray-600">상세 링크:</p>
      </div>
    </div>
  );
}

export default Step3_recommend_practice;
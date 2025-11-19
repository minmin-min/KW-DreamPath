// frontend/src/components/Step2_recommend_club.jsx
import React, { useState } from "react"; 
import step2_sprout from "../assets/step2_sprout.png"; 
import mascot from "../assets/mascot.png";

// 활동 카드 공통 스타일
const cardStyle = "w-full bg-white border border-[#840E1E] rounded-lg p-4 shadow-sm relative h-[180px]";

// 활동 데이터 하드코딩
const recommendedActivities = {
    club: {
        type: "동아리",
        name: "로빛",
        field: "로봇/AI",
        introduction: "로빛은 광운대학교의 중앙 로봇 동아리로, 다양한 로봇 제작 및 알고리즘 학습을 통해 실전 경험을 쌓고 국내외 대회에 참가합니다.",
        category: "중앙 동아리",
    },
    research: {
        type: "학부연구생",
        name: "RAIL",
        professor: "홍길동 교수님",
        field: "AI/딥러닝",
        introduction: "RAIL 연구실은 인공지능 및 딥러닝 분야를 연구하며, 학부생들은 데이터 분석, 모델 구축, 최신 논문 리뷰 등의 활동을 통해 깊이 있는 지식을 습득합니다.",
        link: "연구실 홈페이지 주소",
    }
};

// --- 팝업 (모달) 컴포넌트 정의 ---
function ActivityDetailModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 transform transition-all">
        
        {/* 모달 헤더 */}
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-[#840E1E]">{activity.name} ({activity.type})</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-900 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="space-y-3">
          <p className="text-md text-gray-700">
            <span className="font-semibold text-gray-900">분야:</span> {activity.field}
          </p>
          {activity.professor && (
            <p className="text-md text-gray-700">
              <span className="font-semibold text-gray-900">담당 교수:</span> {activity.professor}
            </p>
          )}
          {activity.category && (
            <p className="text-md text-gray-700">
              <span className="font-semibold text-gray-900">구분:</span> {activity.category}
            </p>
          )}

          <p className="text-md text-gray-700 border-t pt-3 mt-3">
            <span className="font-semibold text-gray-900 block mb-1">{activity.type} 소개:</span>
            {activity.introduction}
          </p>
        </div>

        {/* 모달 푸터 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#840E1E] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
// ------------------------------------

function ActivityCard({ activity, onClick, title }) {
    return (
        <div className="flex-1">
          {/* 동아리/학부연구생 제목 + 상세 정보 확인 텍스트 */}
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            {title}
            <span className="ml-2 text-sm font-normal text-gray-400">
              (클릭하여 상세 정보 확인)
            </span>
          </h3>
          {/* 카드 본문 */}
          <div 
            onClick={() => onClick(activity)}
            className={`${cardStyle} hover:shadow-lg transition-shadow cursor-pointer`} 
          >
            <p className="text-lg font-bold text-gray-800 mb-2 text-center">{activity.name}</p>
            <p className="text-sm text-gray-600">분야: {activity.field}</p>
            {activity.professor && <p className="text-sm text-gray-600">교수: {activity.professor}</p>}
            
            <img 
                src={mascot}
                alt="마스코트" 
                className="absolute bottom-1 right-2 w-8 h-auto opacity-70"
            />
          </div>
        </div>
    );
}


function Step2_recommend_club() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const openModal = (activity) => {
    setSelectedActivity(activity);
  };

  const closeModal = () => {
    setSelectedActivity(null);
  };
  
  const club = recommendedActivities.club;
  const research = recommendedActivities.research;

  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md font-sans">
      
      {/* 2단계 메인 제목 */}
      <div className="flex items-center space-x-3 mb-6">
        <img src={step2_sprout} alt="2단계 아이콘" className="w-8 h-8" /> 
        <h2 className="text-xl font-bold text-gray-800">
          2단계. 학교 활동으로 관련 지식을 쌓고 인맥을 형성해보세요
        </h2>
      </div>

      <div className="flex space-x-6">
        {/* 동아리 카드 */}
        <ActivityCard 
            activity={club} 
            onClick={openModal} 
            title="동아리" 
        />

        {/* 학부연구생 카드 */}
        <ActivityCard 
            activity={research} 
            onClick={openModal} 
            title="학부연구생" 
        />
      </div>
      
      {/* 모달 렌더링 */}
      <ActivityDetailModal 
        activity={selectedActivity} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default Step2_recommend_club;
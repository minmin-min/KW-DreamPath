// frontend/src/components/Step1_recommend_lecture.jsx
import React, { useState } from "react";
import step1_ground from "../assets/step1_ground.png";
import mascot from "../assets/mascot.png";

// 강의 데이터 하드코딩
const recommendedCourses = [
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
    detail: "대규모 데이터에서 유의미한 패턴과 지식을 발견하는 방법을 배웁니다. 기계 학습 알고리즘, 통계적 추론 및 데이터 시각화 기법을 다룹니다.",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
    detail: "데이터 마이닝 상세 내용 2",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
    detail: "데이터 마이닝 상세 내용 3",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
    detail: "데이터 마이닝 상세 내용 4",
  },
];

// --- 팝업 (모달) 컴포넌트 정의 ---
function CourseDetailModal({ course, onClose }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 transform transition-all">
        
        {/* 모달 헤더 */}
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-[#840E1E]">{course.title}</h3>
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
            <span className="font-semibold text-gray-900">개설 학과:</span> {course.department}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold text-gray-900">담당 교수:</span> {course.professor}
          </p>
          <p className="text-md text-gray-700 border-t pt-3 mt-3">
            <span className="font-semibold text-gray-900 block mb-1">상세 강의 내용:</span>
            {course.detail}
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

function CourseCard({ course, onClick }) { // course 객체와 onClick 핸들러를 props로 받음
    return (
        <div 
            onClick={() => onClick(course)} 
            className="w-full bg-white border border-[#840E1E] rounded-lg p-4 
            shadow-sm hover:shadow-lg transition-shadow relative text-center cursor-pointer" 
        >
            <p className="text-[18px] font-bold text-[#840E1E] mb-2">{course.title}</p>
            <p className="text-sm text-gray-600">개설 학과: {course.department}</p>
            <p className="text-sm text-gray-600">담당 교수: {course.professor}</p>
            
            {/* 카드 크기를 유지하기 위한 빈 공간 확보 */}
            <div className="mt-2 text-sm invisible">공간 확보를 위한...</div> 
            
            {/* 작은 마스코트 이미지*/}
            <img 
                src={mascot}
                alt="강의 아이콘" 
                className="absolute bottom-1 right-2 w-8 h-auto opacity-70"
            />
        </div>
    );
}

function Step1_recommend_lecture() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md font-sans">
      
      {/* 1단계 메인 제목 */}
      <div className="flex items-center space-x-3 mb-6">
        <img src={step1_ground} alt="1단계 아이콘" className="w-8 h-8" /> 
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          1단계. 이런 강의를 추천해요
          {/* 클릭하여 상세 정보 확인 텍스트 */}
          <span className="ml-4 text-base font-normal text-gray-400">
            (클릭하여 상세 정보 확인)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {recommendedCourses.map((course, index) => (
          <CourseCard 
            key={index} 
            course={course}
            onClick={openModal}
          />
        ))}
      </div>
      
      {/* 모달 컴포넌트 렌더링 */}
      <CourseDetailModal 
        course={selectedCourse} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default Step1_recommend_lecture;
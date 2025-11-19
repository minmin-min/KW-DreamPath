// frontend/src/components/Step1_recommend_lecture.jsx
import React from "react";
import step1_ground from "../assets/step1_ground.png";
import mascot from "../assets/mascot.png";

// 강의 데이터 하드코딩
const recommendedCourses = [
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
  },
  {
    title: "데이터 마이닝",
    department: "정보융합학부",
    professor: "이상민",
  },
];

function CourseCard({ title, department, professor }) {
    return (
        <div 
            className="w-full bg-white border border-[#840E1E] rounded-lg p-4 
            shadow-sm hover:shadow-md transition-shadow relative text-center" 
        >
            <p className="text-[18px] font-bold text-[#840E1E] mb-2">{title}</p>
            <p className="text-sm text-gray-600">개설 학과: {department}</p>
            <p className="text-sm text-gray-600">담당 교수: {professor}</p>
            <p className="text-sm text-gray-400 mt-2">강의 내용: ~~~</p>
            
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
  return (
    <div className="w-8/12 bg-white p-8 pt-0 shadow-md font-sans">
      <div className="flex items-center space-x-3 mb-6">
        {/* **수정: rounded-full 클래스 제거** */}
        <img src={step1_ground} alt="1단계 아이콘" className="w-8 h-8" /> 
        <h2 className="text-xl font-bold text-gray-800">
          1단계. 이런 강의를 추천해요
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {recommendedCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}

export default Step1_recommend_lecture;
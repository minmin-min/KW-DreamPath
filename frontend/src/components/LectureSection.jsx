// src/components/LectureSection.jsx
import React from "react"; // useState 제거

export default function LectureSection({ onSelect }) {
  // 토글 상태 및 관련 로직 제거

  // 학년/학기별로 묶은 예시 데이터
  const groupedLectures = {
    "1-1": ["작물재배학", "데이터사이언스개론", "컴퓨터기초"],
    "1-2": ["작물관리학", "유기농업개론", "선형대수"],
    "2-1": ["통계학개론", "프로그래밍입문", "자료구조"],
    "2-2": ["작물생리학", "스마트팜기초", "알고리즘"],
    "3-1": ["생명정보학", "데이터마이닝", "운영체제"],
    "3-2": ["작물육종학", "인공지능개론", "네트워크"],
    "4-1": ["작물유전체학", "농업정책학", "데이터베이스"],
    "4-2": ["캡스톤디자인", "현장실습", "고급프로그래밍"],
  };

  return (
    <div className="w-full">
      {/* ---------- 제목 (토글 버튼 대신 <div> 사용) ---------- */}
      <div className="flex items-center gap-3 text-3xl font-extrabold text-red-700 h-[40px] leading-none mb-3">
        이런 강의를 들어보세요
        {/* ▼ 아이콘 제거 */}
      </div>

      {/* ---------- 내용: 항상 보여주기 ---------- */}
      <div className="mt-3 overflow-x-auto">
        {/* 모든 학기 섹션을 가로로 나열하는 컨테이너 */}
        <div className="flex flex-nowrap gap-2 pb-2">

          {Object.entries(groupedLectures).map(([semester, subjects]) => (
            <div 
              key={semester} 
              className="flex flex-col items-start shrink-0"
            >
              {/* 1. 학년/학기 제목 */}
              <div
                key={`header-${semester}`}
                className={`
                  px-4 py-1.5 rounded-md text-sm font-semibold mb-2 border-none cursor-default
                  bg-red-100 text-red-700 
                `}
              >
                {semester}
              </div>

              {/* 2. 해당 학기의 강의 목록 */}
              <div className="flex flex-col gap-2">
                {subjects.map((title, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      onSelect({
                        type: "lecture",
                        id: `${semester}-${idx}`,
                        title,
                        info: { desc: `${title} 설명`, credit: 3 },
                      })
                    }
                    className="px-4 py-1.5 bg-white text-gray-700 border rounded-md text-sm hover:bg-gray-100 w-max"
                  >
                    {title}
                  </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
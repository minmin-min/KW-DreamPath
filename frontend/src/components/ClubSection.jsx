// src/components/ClubSection.jsx
import React from "react"; // useState 제거

export default function ClubSection({ onSelect, filter }) {
    // 토글 상태 및 관련 로직 제거

    // 동아리 및 연구생 데이터
    const clubData = ["로봇"];
    const researchData = [
        { name: "dslab", professor: "이상민 교수님" },
    ];
    
    // 검색어 필터링 (필터 기능은 유지)
    const filteredClubs = clubData.filter(c => filter ? c.includes(filter) : true);
    const filteredResearch = researchData.filter(r => filter ? r.name.includes(filter) || r.professor.includes(filter) : true);


    return (
        <div className="w-full">
            {/* ---------- 1. 메인 제목 (토글 버튼 대신 <div> 사용) ---------- */}
            <div className="flex items-center gap-3 text-3xl font-extrabold text-red-700 h-[40px] leading-none">
                학교 활동 추천해드릴게요
                {/* ▼ 아이콘 제거 */}
            </div>

            {/* ---------- 2. 메인 내용: 항상 보여주기 ---------- */}
            <div className="mt-3 space-y-6"> 
                
                {/* ==================== 동아리 섹션 ==================== */}
                <div>
                    {/* 3. 서브 제목: "동아리" */}
                    <div className="flex items-center gap-3 text-2xl font-bold text-red-700 h-[30px] leading-none mb-2">
                        동아리
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filteredClubs.map((club, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSelect({ type: "club", title: club, info: { desc: `${club} 소개` } })}
                                className="px-4 py-1.5 bg-white text-gray-700 border rounded-md text-sm hover:bg-gray-100"
                            >
                                {club}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* ==================== 학부연구생 섹션 ==================== */}
                <div>
                    {/* 4. 서브 제목: "학부연구생" */}
                    <div className="flex items-center gap-3 text-2xl font-bold text-red-700 h-[30px] leading-none mb-2">
                        학부연구생
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filteredResearch.map((research, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSelect({ type: "research", title: research.name, info: { professor: research.professor } })}
                                className="px-4 py-1.5 bg-white text-gray-700 border rounded-md text-sm hover:bg-gray-100 flex flex-col items-start"
                            >
                                <span className="font-semibold">
                                    {research.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {research.professor}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
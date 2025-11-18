// src/components/EtcSection.jsx
import React from "react"; // useState 제거

export default function EtcSection() {
  // [open1, setOpen1] 및 [open2, setOpen2] useState 제거

  return (
    <div className="w-full flex flex-col space-y-12">

      {/* 섹션 1: 관련 직업 정보 */}
      <div>
        {/* 제목 (토글 버튼 대신 <div> 사용) */}
        <div
          className="flex items-center gap-3 text-3xl font-extrabold text-red-700 leading-none"
        >
          관련 직업 정보를 알려드려요
          {/* ▲ / ▼ 아이콘 제거 */}
        </div>

        {/* 내용: 항상 보여주기 */}
        <div className="flex gap-3 flex-wrap mt-3">
          <button className="px-4 py-2 bg-white border rounded-md text-sm hover:bg-gray-100">
            직업명 / 직무설명
          </button>
        </div>
      </div>

      {/* 섹션 2: 직업 훈련 */}
      <div>
        {/* 제목 (토글 버튼 대신 <div> 사용) */}
        <div
          className="flex items-center gap-3 text-3xl font-extrabold text-red-700 leading-none"
        >
          내일배움카드로 직업훈련도 해볼까요?
          {/* ▲ / ▼ 아이콘 제거 */}
        </div>

        {/* 내용: 항상 보여주기 */}
        <div className="flex gap-3 flex-wrap mt-3">
          <button className="px-4 py-2 bg-white border rounded-md text-sm hover:bg-gray-100">
            훈련과정명
          </button>
        </div>
      </div>

    </div>
  );
}
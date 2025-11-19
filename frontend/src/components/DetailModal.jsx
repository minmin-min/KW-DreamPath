// src/components/DetailModal.jsx
export default function DetailModal({ data, onClose }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg relative">

        <button onClick={onClose} className="absolute top-2 right-3 text-xl">✕</button>

        <h2 className="text-xl font-bold text-red-700 mb-3">
          {data.type === "lecture" ? data.title : data.name}
        </h2>

        {/* 강의 상세 */}
        {data.type === "lecture" && (
          <>
            <p className="font-semibold">과목 설명</p>
            <p className="text-gray-700 mb-4">{data.info.description}</p>

            <p className="font-semibold mt-4">기본 정보</p>
            <table className="mt-2 text-sm">
              <tbody>
                <tr>
                  <td className="font-bold w-20">학점</td>
                  <td>{data.info.credit}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* 동아리 상세 */}
        {data.type === "club" && (
          <>
            <p className="font-semibold">동아리 소개</p>
            <p>{data.intro}</p>
          </>
        )}

      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind 작동 완료 🎉</h1>
      <p className="mt-4 text-gray-700">이 문장이 파란색 제목 아래에 잘 보이면 성공!</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        클릭 테스트
      </button>
    </div>
  );
}

export default App;

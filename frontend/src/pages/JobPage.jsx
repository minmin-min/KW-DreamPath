// frontend/src/JobPage.jsx

import React from 'react';
import Header from "../components/Header";
import Info from "../components/Info";
import Step1_recommend_lecture from "../components/Step1_recommend_lecture";
import Step2_recommend_club from "../components/Step2_recommend_club";
import Step3_recommend_practice from "../components/Step3_recommend_practice";
import Etc_recommend from "../components/Etc_recommend";

function JobPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pb-20">
      <Header /> 
      <Info />
      <Step1_recommend_lecture />
      <Step2_recommend_club />
      <Step3_recommend_practice />
      <Etc_recommend />
    </div>
  );
}

export default JobPage;
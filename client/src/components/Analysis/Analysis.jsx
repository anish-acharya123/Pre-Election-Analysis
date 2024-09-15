// import "../styles/Analysis.scss";
import React, { useState } from "react";
import AgeGroupChart from "./AgeGroupChart";
import AprioriResults from "./AprioriResults";
import CandidateAnalysis from "./CandidateAnalysis";
import ClusterScatterPlot from "./ClusteringData";
import GenderAnalysis from "./GenderAnalysis";

const Analysis = () => {
  const [activeSection, setActiveSection] = useState("gender");
  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <section className=" flex justify-center items-center ">
      <div className="flex  flex-col justify-evenly items-center w-full gap-22 md:gap-0">
        <div className="bg-[#12528c] text-white py-2  md:py-4 flex justify-center gap-10 w-full">
          <div className="max-w-[1440px] flex  justify-end gap-10 w-full px-6">
            <button
              className="text-[12px] md:text-[16px]"
              onClick={() => handlesectionChange("gender")}
            >
              Gender Distribution
            </button>

            <button
              className="text-[12px] md:text-[16px]"
              onClick={() => handlesectionChange("vote")}
            >
              Vote Distribution
            </button>
            <button
              className="text-[12px] md:text-[16px]"
              onClick={() => handlesectionChange("age")}
            >
              Age Distribution
            </button>
            <button
              className="text-[12px] md:text-[16px]"
              onClick={() => handlesectionChange("apriori")}
            >
              Association Rule
            </button>
          </div>
        </div>

        <div className=" max-w-[1440px] px-6 w-full py-16">
          {activeSection === "gender" && <GenderAnalysis />}
          {activeSection === "vote" && <CandidateAnalysis />}
          {activeSection === "age" && <AgeGroupChart />}
          {activeSection === "apriori" && <AprioriResults />}
        </div>
      </div>
    </section>
  );
};

export default Analysis;

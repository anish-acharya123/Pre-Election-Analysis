import "../styles/Analysis.scss";
import CandidateAnalysis from "./CandidateAnalysis";
import ClusterScatterPlot from "./ClusteringData";
import GenderAnalysis from "./GenderAnalysis";

const Analysis = () => {
  return (
    <section className="flex items-center justify-center py-20  ">
      <div className="max-w-[1440px] px-6 flex flex-col gap-10 ">
        <h1 className="text-center  md:text-[52px] text-[32px]  py-4 sm:block  font-semibold text-[#12529C] leading-[100%]">
          Election Data Analysis
        </h1>

        <div
          style={{}}
          className=" grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4"
        >
          <GenderAnalysis />
          <CandidateAnalysis />
          {/* <ClusterScatterPlot /> */}
        </div>
      </div>
    </section>
  );
};

export default Analysis;

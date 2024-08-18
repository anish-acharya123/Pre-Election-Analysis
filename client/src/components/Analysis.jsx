import "../styles/Analysis.scss";
import CandidateAnalysis from "./CandidateAnalysis";
import ClusterScatterPlot from "./ClusteringData";
import GenderAnalysis from "./GenderAnalysis";

const Analysis = () => {
  return (
    <section className="analysis-section">
      <h1>Election Data Analysis</h1>
      <div className="analysis_main">
        <div style={{ marginBottom: "30px" }} className="analysis_pic">
          <GenderAnalysis />
          <CandidateAnalysis />
          <ClusterScatterPlot />
        </div>
      </div>
    </section>
  );
};

export default Analysis;

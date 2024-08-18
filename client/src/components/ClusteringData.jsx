import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";

function ClusterScatterPlot() {
  const [chartData, setChartData] = useState(null);

  const encodeCandidateId = (id) => {
    const mapping = {
      "780-671": 0,
      "863-217": 1,
      "196-723": 2,
      "658-957": 3,
      "391-723": 4,
    };
    return mapping[id];
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/clustered-data").then((response) => {
      const data = response.data;

      // Prepare data for scatter plot
      const scatterData = {
        datasets: [
          {
            label: "Anish",
            data: data
              .filter((d) => d.cluster === 0)
              .map((d) => ({
                x: d.voter_age,
                y: encodeCandidateId(d.candidate_id),
              })),
            backgroundColor: "red",
          },
          {
            label: "Bibek",
            data: data
              .filter((d) => d.cluster === 1)
              .map((d) => ({
                x: d.voter_age,
                y: encodeCandidateId(d.candidate_id),
              })),
            backgroundColor: "green",
          },
          {
            label: "Bizay",
            data: data
              .filter((d) => d.cluster === 2)
              .map((d) => ({
                x: d.voter_age,
                y: encodeCandidateId(d.candidate_id),
              })),
            backgroundColor: "blue",
          },
        ],
      };

      setChartData(scatterData);
    });
  }, []);

  return (
    <div>
      <h2>Age and Candidate Clustering</h2>

      {chartData && <Scatter data={chartData} />}
    </div>
  );
}

export default ClusterScatterPlot;

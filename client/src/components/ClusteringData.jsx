import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";

function ClusterScatterPlot() {
  const [chartData, setChartData] = useState(null);

  const encodeCandidateId = (id) => {
    const mapping = {
      "213-846": 0,
      "855-525": 1,
      "521-757": 2,
      "875-393": 3,
      "151-426": 4,
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
            label: "cluster 0",
            data: data
              .filter((d) => d.cluster === 0)
              .map((d) => ({
                x: d.voter_age,
                y: encodeCandidateId(d.candidate_id),
              })),
            backgroundColor: "red",
          },
          {
            label: "cluster 1",
            data: data
              .filter((d) => d.cluster === 1)
              .map((d) => ({
                x: d.voter_age,
                y: encodeCandidateId(d.candidate_id),
              })),
            backgroundColor: "green",
          },
          {
            label: "cluster 2",
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
    <div className="py-4 col-span-2 px-20 max-w-[80rem]">
      <div className="bg-yellow-200 p-4 grid gap-4">
        <h2 className="text-center font-bold">Age and Candidate Clustering</h2>

        {chartData && <Scatter data={chartData} />}
      </div>
    </div>
  );
}

export default ClusterScatterPlot;

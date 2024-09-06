import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";

function ClusterScatterPlot() {
  const [chartData, setChartData] = useState({ datasets: [] });

  const encodeCandidateId = (id) => {
    const mapping = {
      "213-846": 1,
      "855-525": 3,
      "521-757": 2,
      "875-393": 4,
      "151-426": 0,
    };
    return mapping[id];
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clustered-data")
      .then((response) => {
        const data = response.data;
        console.log(data);

        // Prepare data for scatter plot
        const scatterData = {
          datasets: [
            {
              label: "Cluster 0",
              data: data
                .filter((d) => d.cluster === 0)
                .map((d) => ({
                  x: d.age, // Use d.age if your schema uses this field
                  y: encodeCandidateId(d.candidate_id),
                })),
              backgroundColor: "red",
            },
            {
              label: "Cluster 1",
              data: data
                .filter((d) => d.cluster === 1)
                .map((d) => ({
                  x: d.age, // Use d.age if your schema uses this field
                  y: encodeCandidateId(d.candidate_id),
                })),
              backgroundColor: "green",
            },
            {
              label: "Cluster 2",
              data: data
                .filter((d) => d.cluster === 2)
                .map((d) => ({
                  x: d.age, // Use d.age if your schema uses this field
                  y: encodeCandidateId(d.candidate_id),
                })),
              backgroundColor: "blue",
            },
          ],
        };

        setChartData(scatterData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="py-4 col-span-2 px-20 max-w-[80rem]">
      <div className="bg-yellow-200 p-4 grid gap-4">
        <h2 className="text-center font-bold">Age and Candidate Clustering</h2>

        {chartData && chartData.datasets.length > 0 ? (
          <Scatter data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

export default ClusterScatterPlot;

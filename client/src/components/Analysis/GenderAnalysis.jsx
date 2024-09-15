import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

function GenderAnalysis() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch pie chart data from the server
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics?type=gender"
        );
        setChartData(response.data.data);
        console.log(chartData);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  if (chartData.length === 0) return <div className="text-center text-[28px]">Please wait until the voting period has ended to see the results.</div>;

const votersInfo = chartData
  .map((chart, index) => (
    <span key={index}>
      <strong>{chart.percentage.toFixed(2)}%</strong>{" "}
      <strong>{chart.gender}</strong>
    </span>
  ))
  .reduce((prev, curr) => [prev, " and ", curr]);

  return (
    <div className=" flex flex-col items-center gap-8 p-4">
      <h2 className=" font-bold text-[#12529C] mb-6 text-[55px]">
        Gender Analysis
      </h2>
      <div
        style={{ width: "400px", height: "400px" }}
        className="flex flex-col gap-4"
      >
        <Pie
          data={{
            labels: chartData.map((chart) => chart.gender),
            datasets: [
              {
                label: "Gender Distribution",
                data: chartData.map((chart) => chart.percentage),
                backgroundColor: ["red", "green", "blue"],
              },
            ],
          }}
        />
      </div>
      <div className="">The voters in the election were {votersInfo}</div>
    </div>
  );
}

export default GenderAnalysis;

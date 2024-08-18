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
        const response = await axios.get("http://localhost:3000/api/gender");
        setChartData(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  if (chartData.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h2>Gender Analysis</h2>
      <div
        style={{ width: "300px", height: "300px" }}
        className="analysis_data"
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
    </div>
  );
}

export default GenderAnalysis;

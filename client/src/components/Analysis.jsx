import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import "../styles/Analysis.scss";

const Analysis = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch pie chart data from the server
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/piechartdata"
        );
        setChartData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchChartData();
  }, []);

  if (chartData.length === 0) return <div>Loading...</div>;

  return (
    <div className="analysis_main">
      <h1>Election Data Analysis</h1>
      {chartData.map((chart, index) => (
        <div
          key={index}
          style={{ marginBottom: "30px" }}
          className="analysis_pic"
        >
          <h2>{chart.category}</h2>
          <div
            style={{ width: "300px", height: "300px" }}
            className="analysis_data"
          >
            <Pie
              data={{
                labels: chart.data.map((item) => item.label),
                datasets: [
                  {
                    label: chart.category,
                    data: chart.data.map((item) => `${item.value}`),
                    backgroundColor: [
                      "red",
                      "green",
                      "blue",
                      "cyan",
                      "orange",
                      "grey",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analysis;

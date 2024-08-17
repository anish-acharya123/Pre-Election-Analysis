import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import "../styles/Analysis.scss";

const Analysis = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch pie chart data from the server
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gender");
        setChartData(response.data.data);
        console.log(response.data.data);
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
      <div style={{ marginBottom: "30px" }} className="analysis_pic">
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
    </div>
  );
};

export default Analysis;

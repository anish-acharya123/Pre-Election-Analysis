import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
// import "../styles/Analysis.scss";

const CandidateAnalysis = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch bar chart data from the server
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics?type=candidate"
        );
        setChartData(response.data.data);
        console.log(chartData)
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  if (chartData.length === 0) return <div>Loading...</div>;

  return (
    <div className="bg-green-200 p-4 grid gap-4">
      <h2 className="text-center font-bold">Candidate Vote Distribution</h2>
      <div
        style={{ width: "600px", height: "400px" }}
        className="analysis_data"
      >
        <Bar
          data={{
            labels: chartData.map((chart) => chart.candidate_id), // Assuming each candidate has a 'candidate' field
            datasets: [
              {
                label: "Votes",
                data: chartData.map((chart) => chart.percentage), // Assuming the number of votes is stored in a 'votes' field
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CandidateAnalysis;

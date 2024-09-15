import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const CandidateAnalysis = () => {
  const [chartData, setChartData] = useState([]);
  const [candidates, setCandidates] = useState({});

  useEffect(() => {
    // Fetch chart data and candidate data one by one
    const fetchChartData = async () => {
      try {
        const chartResponse = await axios.get(
          "http://localhost:3000/api/statistics?type=candidate"
        );
        setChartData(chartResponse.data.data);

        // Fetch candidate details after fetching chart data
        const candidateResponse = await axios.get(
          "http://localhost:3000/candidate/list"
        );

        const candidateMap = {};
        candidateResponse.data.forEach((candidate) => {
          candidateMap[candidate.candidateId] = candidate.name;
        });

        console.log(candidateMap);
        setCandidates(candidateMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  if (chartData.length === 0)
    return (
      <div className="text-center text-[28px]">
        Please wait until the voting period has ended to see the results.
      </div>
    );

  return (
    <div className=" p-4 flex  flex-col justify-center items-center">
      <h2 className=" font-bold text-[#12529C] mb-6 text-[55px]">
        Candidate Vote Distribution
      </h2>
      <div
        style={{ width: "1000px", height: "400px" }}
        className="flex justify-center items-center"
      >
        <Bar
          data={{
            labels: chartData.map(
              (chart) => candidates[chart.candidate_id] || chart.candidate_id
            ),
            datasets: [
              {
                label: "Votes",
                data: chartData.map((chart) => chart.percentage),
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

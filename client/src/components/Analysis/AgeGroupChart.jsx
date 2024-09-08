import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgeGroupChart = () => {
  const [ageGroupData, setAgeGroupData] = useState([]);

  // Fetch data inside the component
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics?type=age"
        );
        console.log(response);
        setAgeGroupData(response.data.data);
      } catch (error) {
        console.error("Error fetching age group data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(ageGroupData);

  // Extract age groups and candidate IDs dynamically from the data
  const ageGroups = [...new Set(ageGroupData.map((item) => item.ageGroup))];
  const candidateIds = [
    ...new Set(ageGroupData.map((item) => item.candidate_id)),
  ];

  // Prepare data for the chart
  const data = {
    labels: ageGroups,
    datasets: candidateIds.map((candidateId, index) => ({
      label: `Candidate ${candidateId}`,
      data: ageGroups.map((ageGroup) => {
        const match = ageGroupData.find(
          (item) =>
            item.ageGroup === ageGroup && item.candidate_id === candidateId
        );
        return match ? match.percentage : 0;
      }),
      backgroundColor: `rgba(${index * 50}, 50, 132, 0.5)`, // Dynamic colors
    })),
  };

  // Chart options
  const options = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        max: 50, // Since it's percentage
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AgeGroupChart;

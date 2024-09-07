import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AprioriResults = () => {
  const [frequentItemsets, setFrequentItemsets] = useState([]);
  const [associationRules, setAssociationRules] = useState([]);

  useEffect(() => {
    // Fetch Apriori results from backend
    axios
      .get("http://localhost:3000/api/apriori") // Update this URL to match your backend endpoint
      .then((response) => {
        console.log(response.data);
        const data = response.data[0]; 
        console.log(data.frequent_itemsets);
        setFrequentItemsets(data.frequent_itemsets);
        setAssociationRules(data.association_rules);
      })
      .catch((error) => {
        console.error("Error fetching Apriori results:", error);
      });
  }, []);
  console.log(frequentItemsets);
  // Prepare data for Chart.js
  const chartData = {
    labels: frequentItemsets.map((itemset) => itemset.itemset.join(", ")),
    datasets: [
      {
        label: "Support",
        data: frequentItemsets.map((itemset) => itemset.support),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Frequent Itemsets Support",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Apriori Analysis</h2>

      {/* Chart for Frequent Itemsets */}
      <div style={{ width: "80%", margin: "auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Table for Association Rules */}
      <h3 style={{ marginTop: "30px" }}>Association Rules</h3>
      <table
        style={{ width: "100%", border: "1px solid black", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Antecedent</th>
            <th>Consequent</th>
            <th>Support</th>
            <th>Confidence</th>
            <th>Lift</th>
            <th>Leverage</th>
            <th>Conviction</th>
          </tr>
        </thead>
        <tbody>
          {associationRules.length > 0 ? (
            associationRules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.antecedent.join(", ")}</td>
                <td>{rule.consequent.join(", ")}</td>
                <td>{rule.support.toFixed(4)}</td>
                <td>{rule.confidence.toFixed(4)}</td>
                <td>{rule.lift.toFixed(4)}</td>
                <td>{rule.leverage.toFixed(4)}</td>
                <td>{rule.conviction.toFixed(4)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No rules found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AprioriResults;

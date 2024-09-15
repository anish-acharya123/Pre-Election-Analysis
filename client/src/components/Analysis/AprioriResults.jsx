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
        setFrequentItemsets(data.frequent_itemsets);
        setAssociationRules(data.association_rules);
      })
      .catch((error) => {
        console.error("Error fetching Apriori results:", error);
      });
  }, []);

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
    <div className="flex  flex-col  justify-center items-center w-full  ">
     

      {/* Chart for Frequent Itemsets */}
      {/* <div className="w-4/5 mx-auto">
        <Bar data={chartData} options={chartOptions} />
      </div> */}

      {/* Table for Association Rules */}
      <h3 className="text-2xl font-semibold text-[#12529C] text-center">
        Association Rules
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4 text-left">
          <thead>
            <tr className="bg-[#12529C] text-white">
              <th className="py-3 px-4 border">Antecedent</th>
              <th className="py-3 px-4 border">Consequent</th>
              <th className="py-3 px-4 border">Support</th>
              <th className="py-3 px-4 border">Confidence</th>
              <th className="py-3 px-4 border">Lift</th>
              <th className="py-3 px-4 border">Leverage</th>
              <th className="py-3 px-4 border">Conviction</th>
            </tr>
          </thead>
          <tbody>
            {associationRules.length > 0 ? (
              associationRules.map((rule, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">
                    {rule.antecedent.join(", ")}
                  </td>
                  <td className="py-2 px-4 border">
                    {rule.consequent.join(", ")}
                  </td>
                  <td className="py-2 px-4 border">
                    {rule.support.toFixed(4)}
                  </td>
                  <td className="py-2 px-4 border">
                    {rule.confidence.toFixed(4)}
                  </td>
                  <td className="py-2 px-4 border">{rule.lift.toFixed(4)}</td>
                  <td className="py-2 px-4 border">
                    {rule.leverage.toFixed(4)}
                  </td>
                  <td className="py-2 px-4 border">
                    {rule.conviction.toFixed(4)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center border">
                  No rules found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AprioriResults;

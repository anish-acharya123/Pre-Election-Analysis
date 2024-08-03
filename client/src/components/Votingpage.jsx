import React, { useEffect, useState } from "react";
import "../styles/Votingpage.scss";
import axios from "axios";

function Votingpage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/candidate/list"
        );

        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className="votingpage_main">
      <div className="votingpage_wrapper">
        <div className="votingpage_title">
          {" "}
          Please Choose Your Candidate Carefully:{" "}
        </div>
        <div className="votingpage_candidatecard">
          {data.map((candidate) => (
            <div key={candidate._id} className="candidate_card">
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="candidate-image"
              />
              <div>
                <strong>{candidate.name}</strong> <br />
                <strong>Party:</strong> {candidate.party}
                <br />
                {/* <strong>Candidate ID:</strong> {candidate.candidateId} */}
                <div className="candidate-card-description">
                  <strong>Description:</strong> {candidate.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Votingpage;

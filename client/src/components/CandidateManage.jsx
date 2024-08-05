import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CandidateManage.scss";
import axios from "axios";
import UploadForm from "./UploadCandidate";

function CandidateManage() {
  const [candidates, setCandidates] = useState([]);
  const [uploadForm, setUploadForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/candidate/list"
        );

        setCandidates(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [candidates]);

  const candidateDetail = (id) => {
    navigate(`/candidate/${id}`);
  };

  return (
    <div className="candidatemanage_main">
      {candidates ? (
        <div className="candidate_cardsection">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="candidate_card"
              onClick={() => candidateDetail(candidate.id)}
            >
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="candidate-image"
              />
              <div>
                <strong>{candidate.name}</strong> <br />
                <strong>Party: </strong> {candidate.party}
                <br />
                <strong>Candidate ID: </strong> {candidate.candidateId}
                <div className="candidate-card-description">
                  <strong>Description: </strong>{" "}
                  {candidate.description.slice(0, 25) + " .............."}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "Candidate list is empty"
      )}

      <br />
      <button className="candidate_btn" onClick={(e) => setUploadForm(true)}>
        {" "}
        Add New Candidate
      </button>
      <div
        className={`  ${uploadForm ? "form_canditate" : "newcandidate_form"}`}
      >
        <UploadForm setUploadForm={setUploadForm} />
      </div>
    </div>
  );
}

export default CandidateManage;

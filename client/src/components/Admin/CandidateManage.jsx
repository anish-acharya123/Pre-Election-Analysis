import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/CandidateManage.scss";
import axios from "axios";
import UploadCandidate from "./UploadCandidate";

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
  }, []);

  const candidateDetail = (id) => {
    navigate(`/candidate/${id}`);
  };

  return (
    <div
      className={` md:py-10 py-4 flex flex-col justify-center items-center pb-20`}
    >
      <h1 className="text-center  md:text-[52px] text-[32px]  py-4 sm:block  font-semibold text-[#12529C] leading-[100%]">
        Manage Candidates
      </h1>
      {candidates.length ? (
        <div
          className={`${
            uploadForm ? "pointer-events-none blur-sm" : ""
          } grid grid-cols-2 lg:grid-cols-3 gap-4  pb-10 leading-[130%] sm:leading-normal text-[12px] md:text-[16px]"`}
        >
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`  flex gap-6 text-left md:text-left md:items-center flex-col md:flex-row justify- p-4 border-2 rounded-md shadow-lg ${
                uploadForm && "pointer-events-none blur-sm"
              }`}
              onClick={() => candidateDetail(candidate.id)}
            >
              <figure className=" ">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="lg:h-20 lg:w-20 h-20 w-20 "
                />
              </figure>
              <div className="text-[14px] md:text-[16px] flex-1 f">
                <strong>{candidate.name}</strong> <br />
                <strong>Party: </strong> {candidate.party}
                <br />
                <strong>Candidate ID: </strong> {candidate.candidateId}
                <div className="">
                  <strong>Description: </strong>{" "}
                  {candidate.description.slice(0, 5) + " ......"}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 md:text-[26px]">Candidate list is empty</div>
      )}

      <button
        className=" border-none rounded-md bg-[#12529C] text-white py-4 px-10 w-fit  md:text-[16px] text-[12px]"
        onClick={(e) => setUploadForm(true)}
      >
        {" "}
        Add New Candidate
      </button>
      <div
        className={`  ${
          uploadForm
            ? "block absolute bg-white p-6  border-2 translate-y-[0%] md:translate-y-[0%]"
            : "hidden"
        }`}
      >
        <UploadCandidate setUploadForm={setUploadForm} />
      </div>
    </div>
  );
}

export default CandidateManage;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CandidatesList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

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
    <section
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
      className="flex justify-center py-20  items-center flex-col"
    >
      <div className=" w-full max-w-[1440px]">
        <button
          onClick={() => navigate("/")}
          className="text-center  bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
        >
          ← Back
        </button>
      </div>
      <h1 className="text-[#12528C]  text-left sm:text-[45px] lg:text-[55px] text-[30px] font-bold md:max-w-[65rem] z-50">
        All Candidate List
      </h1>
      <div
        className={` max-w-[1440px] py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  pb-10 leading-[130%] sm:leading-normal text-[12px] md:text-[16px]"`}
      >
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className={` cursor-pointer flex gap-6 text-left md:text-left md:items-center flex-col md:flex-row justify- p-4 border-2 rounded-md shadow-lg`}
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
    </section>
  );
};

export default CandidatesList;

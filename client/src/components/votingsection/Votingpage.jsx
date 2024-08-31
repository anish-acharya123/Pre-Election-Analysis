import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, voterinfoState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
// import "../styles/Votingpage.scss";
import axios from "axios";
import VotingPopup from "./VotingPopup";

function Votingpage() {
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState({});
  const [popUp, setPopUp] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const user = useRecoilValue(voterinfoState);
  const navigate = useNavigate();

  useEffect(() => {
    // setIsSelected({});
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // console.log(user.name);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/candidate/list"
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  const handleInput = (candidate) => {
    setIsSelected(candidate);
  };

  const verifyVote = () => {
    if (!user) {
      setPopUp(false);
    }
    setPopUp(!popUp);
  };
  // console.log(isSelected);
  return (
    isLoggedIn && (
      <section
        className={`flex flex-col items-center justify-center    py-10 `}
      >
        <div
          className={`max-w-[1440px] w-full px-6 flex flex-col ${
            popUp ? "pointer-events-none blur-sm" : ""
          }`}
          // data-aos="fade-up"
          // data-aos-duration="1500"
        >
          <button
            onClick={() => navigate("/userguide")}
            className="text-center  bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
          >
            ← Back
          </button>
          <div className="py-4">
            <h1 className="text-center md:text-[52px] text-[32px]  sm:block  font-semibold text-[#12529C] ">
              Candidate List
            </h1>
            <p className="text-center">You can switch your vote.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4  pb-10 leading-[100%]">
            {data.map((candidate) => (
              <div
                key={candidate._id}
                className={`flex gap-4 text-center md:text-left items-center flex-col md:flex-row justify-between p-4 border-2 rounded-md shadow-lg ${
                  isSelected === candidate ? "bg-[#12529C] text-white" : ""
                }`}
              >
                <figure>
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="h-20 w-20 rounded-full"
                  />
                </figure>
                <div className="text-[12px] md:text-[16px]">
                  <strong>{candidate.name}</strong> <br />
                  <strong>Party:</strong> {candidate.party}
                </div>

                <input
                  type="radio"
                  className="cursor-pointer"
                  value={candidate.candidateId}
                  checked={isSelected === candidate}
                  onChange={() => handleInput(candidate)}
                />
              </div>
            ))}
          </div>
          <button
            className=" border-2 rounded-md bg-[#12529C] text-white py-4 px-10 w-fit  md:text-[16px] text-[12px]"
            onClick={() => verifyVote()}
          >
            Confirm vote
          </button>
        </div>

        <div
          className={`${
            popUp ? "block absolute " : "hidden"
          } md:scale-100 scale-75`}
        >
          <VotingPopup setPopUp={setPopUp} isSelected={isSelected} />
        </div>
      </section>
    )

    // <section className="flex items-center justify-center   py-20">
    //   <div className="max-w-[1440px] w-full px-6">anish</div>
    // </section>
  );
}

export default Votingpage;

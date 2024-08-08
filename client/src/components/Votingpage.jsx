import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, voterIdState, emailState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import "../styles/Votingpage.scss";
import axios from "axios";
import VotingPopup from "./VotingPopup";

function Votingpage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isSelected, setIsSelected] = useState({});
  const [popUp, setPopUp] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const voterId = useRecoilValue(voterIdState);
  const email = useRecoilValue(emailState);
  const navigate = useNavigate();

  useEffect(() => {
    // setIsSelected({});
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/profile?voterId=${voterId}&email=${email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

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
    fetchUser();
    fetchData();
  }, [isLoggedIn, navigate, voterId, email]);

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
      <div className="votingpage_main">
        <div
          className={`${
            popUp
              ? "votingpage_wrapper votingpagewrapper-blur"
              : " votingpage_wrapper"
          }`}
        >
          <div
            className="votingpage_title"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {" "}
            Hi <span style={{ color: "rgb(0, 129, 133)" }}>{user.name}</span> ,
            Please Choose Your Candidate Carefully:{" "}
          </div>
          <div className="votingSection">
            <div
              className="votingCandidate-description item"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <h1>Candidate Profile</h1>
              <div>
                <p>
                  Get to know the candidates running for office. Each profile
                  provides detailed information about their background,
                  platforms, and qualifications. Take the time to review your
                  options and make an informed decision.{" "}
                </p>
                <br />
                <p>
                  Your vote is your voice. Make it count by carefully
                  considering each candidate's vision and how it aligns with
                  your values and the needs of our community.
                </p>
              </div>

              <br />
              <p>Vote valid for:</p>
            </div>
            <div
              className="votingpage_candidatesection item"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              {/* <div>scroll down for More candidate</div> */}
              {data.map((candidate) => (
                <div
                  key={candidate._id}
                  className={`${
                    isSelected == candidate
                      ? "candidate-selected votingpage-candidatecard"
                      : "votingpage-candidatecard"
                  }`}
                >
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="votingpage-candidateimage"
                  />
                  <div className="votingpage-candidatedetail">
                    <strong>{candidate.name}</strong> <br />
                    <strong>Party:</strong> {candidate.party}
                  </div>

                  <div className="radio">
                    <input
                      type="radio"
                      className="candidateselect"
                      value={candidate.candidateId}
                      checked={isSelected == candidate}
                      onChange={() => handleInput(candidate)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="votingpage-btndiv">
            <button className="votingpage-btn" onClick={() => verifyVote()}>
              Verify vote
            </button>
          </div>
        </div>

        <div className={`${popUp ? "votingpage-popup" : "popup"}`}>
          <VotingPopup
            setPopUp={setPopUp}
            isSelected={isSelected}
            userId={user.name}
          />
        </div>
      </div>
    )
  );
}

export default Votingpage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, voterIdState, emailState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import "../styles/Votingpage.scss";
import axios from "axios";
import VotingPopup from "./VotingPopup";

function Votingpage() {
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState({});
  const [popUp, setPopUp] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const voterId = useRecoilValue(voterIdState);
  const email = useRecoilValue(emailState);
  const navigate = useNavigate();

  useEffect(() => {
    // setIsSelected({});
    // if (!isLoggedIn) {
    //   navigate("/login");
    //   return;
    // }

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
    // isLoggedIn &&
    // <section className="">
    //   <div
    //     className={`${
    //       popUp
    //         ? "votingpage_wrapper votingpagewrapper-blur"
    //         : " votingpage_wrapper"
    //     }`}
    //   >
  

    //         <br />
    //         <p>Vote valid for:</p>
    //       </div>
    //       <div
    //         className="votingpage_candidatesection item"
    //         data-aos="fade-left"
    //         data-aos-duration="1500"
    //       >
    //         {/* <div>scroll down for More candidate</div> */}
    //         {data.map((candidate) => (
    //           <div
    //             key={candidate._id}
    //             className={`${
    //               isSelected == candidate
    //                 ? "candidate-selected votingpage-candidatecard"
    //                 : "votingpage-candidatecard"
    //             }`}
    //           >
    //             <img
    //               src={candidate.photo}
    //               alt={candidate.name}
    //               className="votingpage-candidateimage"
    //             />
    //             <div className="votingpage-candidatedetail">
    //               <strong>{candidate.name}</strong> <br />
    //               <strong>Party:</strong> {candidate.party}
    //             </div>

    //             <div className="radio">
    //               <input
    //                 type="radio"
    //                 className="candidateselect"
    //                 value={candidate.candidateId}
    //                 checked={isSelected == candidate}
    //                 onChange={() => handleInput(candidate)}
    //               />
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="votingpage-btndiv">
    //       <button className="votingpage-btn" onClick={() => verifyVote()}>
    //         Verify vote
    //       </button>
    //     </div>
    //   </div>

    //   <div className={`${popUp ? "votingpage-popup" : "popup"}`}>
    //     <VotingPopup setPopUp={setPopUp} isSelected={isSelected} user={user} />
    //   </div>
    // </section>

    <section className="flex items-center justify-center   py-20">
      <div className="max-w-[1440px] w-full px-6">anish</div>
    </section>
  );
}

export default Votingpage;

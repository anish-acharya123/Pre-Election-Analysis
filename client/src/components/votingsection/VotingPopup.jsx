import React, { useState } from "react";
import axios from "axios";
import { voterIdState, emailState, voterinfoState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { encryptData, generateIv } from "../../utils/aesUtils";

const secretKey = import.meta.env.VITE_APP_SECRET_KEY;

function VotingPopup({ isSelected, setPopUp }) {
  const voterId = useRecoilValue(voterIdState);
  const user = useRecoilValue(voterinfoState);
  const navigate = useNavigate();

  const voteConfirm = async () => {
    try {
      const iv = generateIv();
      const { iv: ivHex, encryptedData } = await encryptData(
        isSelected.candidateId,
        secretKey,
        iv
      );
      // console.log(encryptedData)

      console.log(ivHex,",", encryptedData);
      const response = await axios.post("http://localhost:3000/votes", {
        voterId,
        candidateId: encryptedData,
        iv: ivHex,
        voterAge: user.age,
        voterGender: user.gender,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success("Congratulations! Your vote was successful.");
        setPopUp(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 409) {
        setPopUp(false);
        toast.error("You have already voted");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    }
  };

  return (
    <div className="relative bg-white shadow-md py-8 px-4 w-[25rem] border-2">
      {Object.keys(isSelected).length > 0 ? (
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-[20px] font-bold">
            Are you sure you want to vote for this candidate?
          </h1>
          <div>
            <img
              src={isSelected.photo}
              alt={isSelected.name}
              className="h-30 w-20 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <span>
              <strong>Name: </strong> {isSelected.name}
            </span>
            <span>
              <strong>Party: </strong>
              {isSelected.party}
            </span>
            <span>
              <strong>CandidateId: </strong>
              {isSelected.candidateId}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => voteConfirm()}
              className="text-center bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
            >
              Vote
            </button>
            <button
              onClick={() => setPopUp(false)}
              className="border-2 p-2 rounded md:text-[16px] text-[12px]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-[20px] font-bold">
            You need to select your candidate
          </h1>
          <button
            onClick={() => setPopUp(false)}
            className="border-2 p-2 rounded md:text-[16px] text-[12px]"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default VotingPopup;

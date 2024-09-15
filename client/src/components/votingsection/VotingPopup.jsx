import React from "react";
import axios from "axios";
import { voterIdState, voterinfoState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

// Import your environment variables
const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_APP_SECRET_KEY);

const encryptData = (data, secretKey, iv) => {
  try {
    const key = CryptoJS.enc.Hex.parse(secretKey); // Ensure key is in the correct format
    const ivWordArray = CryptoJS.enc.Hex.parse(iv); // Ensure IV is in the correct format

    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert encrypted data to Hexadecimal format
    return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

const generateIv = () => {
  // Generate a random IV and convert to hexadecimal format
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
};

function VotingPopup({ isSelected, setPopUp }) {
  const voterId = useRecoilValue(voterIdState);
  const user = useRecoilValue(voterinfoState);
  const navigate = useNavigate();

  const voteConfirm = async () => {
    try {
      const iv = generateIv();
      const encryptedCandidateId = encryptData(
        isSelected.candidateId,
        secretKey,
        iv
      );

      if (!encryptedCandidateId) {
        throw new Error("Encryption failed.");
      }

      const response = await axios.post("http://localhost:3000/votes", {
        voterId,
        candidateId: encryptedCandidateId,
        iv,
        voterAge: user.age,
        voterGender: user.gender,
      });

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
      } else {
        toast.error("An error occurred while processing your vote.");
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

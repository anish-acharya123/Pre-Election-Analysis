import React, { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "../styles/VotingPopup.scss";

// console.log(import.meta.env.VITE_APP_SECRET_KEY);
const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_APP_SECRET_KEY);
const encryptData = (data, secretKey, iv) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey); // Convert secret key to a WordArray
  const ivWordArray = CryptoJS.enc.Utf8.parse(iv); // Convert IV to a WordArray

  return CryptoJS.AES.encrypt(data, key, { iv: ivWordArray }).toString();
};

const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex); // Generate a random 16-byte IV

function VotingPopup({ isSelected, setPopUp, user }) {
  const encryptedCandidateId = encryptData(
    isSelected.candidateId,
    secretKey,
    iv
  );

  const voteConfirm = async () => {
    try {
      const response = await axios.post("http://localhost:3000/votes", {
        voterId: user.voterId,
        candidateId: encryptedCandidateId,
        iv,
      });
      if (response.status === 200) {
        setPopUp(false);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setPopUp(false);
        alert("you already voted");
        console.log("confilt errror");
      }
    }
  };

  return (
    <div>
      {Object.keys(isSelected).length > 0 ? (
        <div className="popup-content">
          <h1>Are you sure? You are going to vote:</h1>
          <div>
            <img
              src={isSelected.photo}
              alt={isSelected.name}
              className="popup-img"
            />
          </div>
          <div>
            <strong>Name: </strong> {isSelected.name}
          </div>
          <div>
            <strong>Party: </strong>
            {isSelected.party}
          </div>
          <div>
            <button onClick={() => voteConfirm()}>Vote Now</button>
          </div>
        </div>
      ) : (
        <h1>You need to select your candidate</h1>
      )}
      <div className="popup-cut">
        <button onClick={() => setPopUp(false)}>X</button>
      </div>
    </div>
  );
}

export default VotingPopup;

import React, { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "../styles/VotingPopup.scss";

// console.log(import.meta.env.VITE_APP_SECRET_KEY);
const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_APP_SECRET_KEY);
const hmacKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_APP_HMAC_KEY);

const generateRandomIV = () => {
  return CryptoJS.lib.WordArray.random(16);
};

const encrypt = (text) => {
  const iv = generateRandomIV();
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    secretKey,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const cipherText = iv.concat(encrypted.ciphertext);
  const hmac = CryptoJS.HmacSHA256(cipherText, hmacKey).toString();

  return `${hmac}:${cipherText.toString(CryptoJS.enc.Base64)}`;
};

const decrypt = (ciphertext) => {
  const [hmac, encryptedData] = ciphertext.split(":");
  const cipherText = CryptoJS.enc.Base64.parse(encryptedData);

  const iv = CryptoJS.lib.WordArray.create(cipherText.words.slice(0, 4));
  const actualCipherText = CryptoJS.lib.WordArray.create(
    cipherText.words.slice(4)
  );

  const calculatedHmac = CryptoJS.HmacSHA256(cipherText, hmacKey).toString();

  if (calculatedHmac !== hmac) {
    throw new Error("Data integrity check failed.");
  }

  const bytes = CryptoJS.AES.decrypt(
    { ciphertext: actualCipherText },
    secretKey,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return CryptoJS.enc.Utf8.stringify(bytes);
};

function VotingPopup({ isSelected, setPopUp, userId }) {
  // const [encryptedData, setEncryptedData] = useState("");
  // const [decryptedData, setDecryptedData] = useState("");
  // const [userId, setUserId] = useState("");
  // const [candidateId, setCandidateId] = useState("");

  const encryptedUserId = encrypt(userId);
  const encryptedCandidateId = encrypt(isSelected.candidateId);

  // const handleDecrypt = () => {
  //   const decryptedUserId = decrypt(
  //     encryptedData.split(", ")[0].split(": ")[1]
  //   );
  //   const decryptedCandidateId = decrypt(
  //     encryptedData.split(", ")[1].split(": ")[1]
  //   );
  //   setDecryptedData(
  //     `UserID: ${decryptedUserId}, CandidateID: ${decryptedCandidateId}`
  //   );
  // };

  const voteConfirm = async () => {
    const response = await axios.post("http://localhost:3000/votes", {
      voterId: encryptedUserId,
      citizenshipId: encryptedCandidateId,
    });
    console.log(response);
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

import React, { useState } from "react";
import "../styles/VotingPopup.scss";

function VotingPopup({ isSelected, setPopUp }) {
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
            <button>Vote Now</button>
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

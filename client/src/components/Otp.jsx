import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isLoggedInState,
  voterIdState,
  citizenshipNumberState,
  emailState,
} from "../recoil/atoms";
import { useNavigate } from "react-router-dom";
import "../styles/otp.scss";
import axios from "axios";

function Otp() {
  const voterId = useRecoilValue(voterIdState);
  const citizenshipNumber = useRecoilValue(citizenshipNumberState);
  const email = useRecoilValue(emailState);
  // const isLoggedIn = useRecoilValue(isLoggedInState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/verifyotp",
        {
          voterId,
          email,
          otp,
          citizenshipNumber,
        }
      );
      console.log(response);

      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/votingpage");
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (e) {
      if (e.response) {
        setError(e.response.data.msg);
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  //  isLoggedIn &&
  return (
    isLoggedIn && (
      <div className="otp_main">
        <div className="otp_wrapper">
          <form onSubmit={submitOtp}>
            <div className="otp_field">
              <label htmlFor="otp">Enter Your OTP:</label> <br />
              <input
                type="text"
                maxLength="6"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <br />
            {error && <div>{error}</div>}
            <br />
            <div className="otp_submit">
              <input type="submit" value="verifyOtp" />
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Otp;

import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isLoggedInState,
  voterIdState,
  citizenshipNumberState,
  emailState,
  isSuccessState,
} from "../recoil/atoms";
import { useNavigate } from "react-router-dom";
import "../styles/otp.scss";
import axios from "axios";

function Otp() {
  const voterId = useRecoilValue(voterIdState);
  const citizenshipNumber = useRecoilValue(citizenshipNumberState);
  const email = useRecoilValue(emailState);
  const success = useRecoilValue(isSuccessState);
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
        setIsLoggedIn(true);
        navigate("/votingpage", { replace: true });
      } else if (response.status === 400) {
        setError(response.data.msg);
        // setIsLoggedIn(false);
        // navigate("/login");
      }
    } catch (e) {
      console.log(e.response);
      if (e.response) {
        setError(e.response.data.msg);
        // setTimeout(() => {
        //   navigate("/login");
        //   window.location.reload();
        // }, 5000);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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

            {error && <div style={{ color: "red" }}>{error}</div>}
            <br />
            <div className="otp_submit">
              <input type="submit" value="verifyOtp" />
            </div>
          </form>
          <br />
          {success && <div>Otp sent to your Email</div>}
        </div>
      </div>
    )
  );
}

export default Otp;

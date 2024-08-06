import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  isLoggedInState,
  voterIdState,
  citizenshipNumberState,
  emailState,
} from "../recoil/atoms";
import axios from "axios";
import img from "../assets/votingImage/image.png";
import "../styles/Login.scss";

function Login() {
  const [voterId, setVoterId] = useRecoilState(voterIdState);
  const [citizenshipNumber, setCitizenshipNumber] = useRecoilState(
    citizenshipNumberState
  );
  const [email, setEmail] = useRecoilState(emailState);
  const [sendOtp, setSendOtp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setSendOtp(false);
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        voterId,
        citizenshipNumber,
        email,
      });
      // console.log(response);
      if (response.status === 201) {
        setSendOtp(true);
        setIsLoggedIn(true);
        navigate("/otp", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.msg || "Unauthorized access");
        } else if (error.response.status === 403) {
          setError(error.response.data.msg || "Forbidden: Invalid input");
        }
      }
    }
    setTimeout(() => {
      setError("");
    }, 6000);
  };
  return (
    !sendOtp &&
    !isLoggedIn && (
      <div className="login_main">
        <div
          className="loginsection"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className="loginImg">
            <img src={img} alt="" />
          </div>
          <div className="login_form">
            <form onSubmit={handleForm}>
              <div className="form_input">
                <label htmlFor="voter_id">Voter ID:</label>
                <input
                  type="text"
                  placeholder="Enter your vote ID"
                  id="voter_id"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <br />

              <div className="form_input">
                <label htmlFor="citizenshipnumber">Citizenship Number:</label>
                <input
                  type="text"
                  placeholder="Enter your Citizenship Number"
                  id="citizenshipnumber"
                  value={citizenshipNumber}
                  onChange={(e) => setCitizenshipNumber(e.target.value)}
                />
              </div>
              <br />
              <div className="form_input">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your Email address"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              {error && <div style={{ color: "red" }}>{error}</div>}
              <br />
              <div className="form_input" id="submit_btn">
                <input type="submit" value="Send Otp" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default Login;

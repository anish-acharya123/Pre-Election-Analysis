import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  isLoggedInState,
  voterIdState,
  citizenshipNumberState,
  emailState,
  isLoadingState,
  isSuccessState,
  errorState,
} from "../recoil/atoms";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AOS from "aos";
import img from "../assets/votingImage/image.png";
import "../styles/Login.scss";
import Loader from "./Loader";

function Login() {
  const [voterId, setVoterId] = useRecoilState(voterIdState);
  const [citizenshipNumber, setCitizenshipNumber] = useRecoilState(
    citizenshipNumberState
  );
  const [email, setEmail] = useRecoilState(emailState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isSuccess, setIsSuccess] = useRecoilState(isSuccessState);
  const [error, setError] = useRecoilState(errorState);
  const [sendOtp, setSendOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setSendOtp(false);
    setIsLoading(false);
    setIsSuccess(false);
    setError("");
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
        setIsSuccess(true);
        setIsLoading(false);
        navigate("/otp", { replace: true });
      }
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);

      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.msg || "Unauthorized access");
          // toast.error(error.response.data.msg);
        } else if (error.response.status === 403) {
          setError(error.response.data.msg || "Forbidden: Invalid input");
        }
      }
    }
    setTimeout(() => {
      setError("");
    }, 6000);
  };

  useEffect(() => {
    if (!sendOtp && !isLoading && !isLoggedIn) {
      AOS.refresh();
    }
  }, [sendOtp, isLoading, isLoggedIn]);

  return (
    <div className="login_main">
      {!sendOtp && !isLoading && !isLoggedIn ? (
        <div
          className="loginsection"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          <div className="loginImg">
            <img src={img} alt="vote img" />
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
                  required
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
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Login;

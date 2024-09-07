import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isLoggedInState,
  voterIdState,
  citizenshipNumberState,
  emailState,
  isSuccessState,
  isLoadingState,
} from "../recoil/atoms";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Otp() {
  const voterId = useRecoilValue(voterIdState);
  const citizenshipNumber = useRecoilValue(citizenshipNumberState);
  const email = useRecoilValue(emailState);
  const success = useRecoilValue(isSuccessState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);
  const submitOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        setIsLoading(false);
        toast.success(response.data.msg);
        navigate("/userguide", { replace: true });
      } else if (response.status === 400) {
        setIsLoading(false);
        toast.error(response.data.msg);
        // setIsLoggedIn(false);
        // navigate("/login");
      }
    } catch (e) {
      console.log(e.response);
      if (e.response) {
        toast.error(e.response.data.error);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, navigate, seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    isLoggedIn && (
      <section className="flex justify-center items-center  h-[80vh]">
        <div className="text-center flex flex-col gap-4">
          <div>
            <h1 className="md:text-[52px] text-[52px] font-semibold text-[#12529C] ">
              OTP
            </h1>
          </div>
          <form onSubmit={submitOtp} className="">
            <div className="">
              <label htmlFor="otp" className="text-[20px] ">
                Enter Your OTP:
              </label>{" "}
              <br />
              <input
                type="text"
                maxLength="6"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border-2 p-2 text-center rounded"
              />
            </div>
            <br />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <br />
            <div className="">
              <input
                type="submit"
                value="Verify OTP"
                className=" py-2 px-4 bg-[#12529C] text-white rounded  cursor-pointer"
              />
            </div>
          </form>
          <div>
            {seconds === 0 ? (
              <h3>Time's up!</h3>
            ) : (
              <h2>{formatTime(seconds)}</h2>
            )}
          </div>

          {success && <div>Check Your Email For OTP</div>}
          <p>
            Didn't get OTP ?{" "}
            <Link to="/login">
              {" "}
              <span className="text-[#12528c]"> Login again</span>{" "}
            </Link>{" "}
          </p>
        </div>
      </section>
    )
  );
}

export default Otp;

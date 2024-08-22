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
import { toast } from "react-toastify";

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
        toast.success(response.data.msg);
        navigate("/userguide", { replace: true });
      } else if (response.status === 400) {
        toast.error(response.data.msg);
        // setIsLoggedIn(false);
        // navigate("/login");
      }
    } catch (e) {
      console.log(e.response);
      if (e.response) {
        toast.error(e.response.data.msg);
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
      <section className="flex justify-center items-center  h-[80vh]">
        <div className="text-center flex flex-col gap-10">
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
                value="verifyOtp"
                className=" py-2 px-4 bg-[#12529C] text-white rounded  cursor-pointer"
              />
            </div>
          </form>
          <br />
          {success && <div>Otp sent to your Email</div>}
        </div>
      </section>
    )
  );
}

export default Otp;

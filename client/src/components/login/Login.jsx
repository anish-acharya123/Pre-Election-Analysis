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
} from "../../recoil/atoms";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AOS from "aos";
import img from "../../assets/votingImage/login.jpg";
import Loader from "./../Loader";

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
    <section className="flex items-center justify-center h-[85vh] ">
      {!sendOtp && !isLoading && !isLoggedIn ? (
        <div
          className="px-8 flex md:gap-8  flex-col pt-40 md:pt-0 pb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <button
            onClick={() => navigate("/")}
            className="text-center  bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
          >
            ← Back
          </button>
          <h1 className="text-center md:text-[52px] text-[40px]  sm:block  font-semibold text-[#12529C]">
            LOGIN
          </h1>
          <div className="md:flex-row flex flex-col items-center gap-8 shadow-md  mt-4 sm:mt-0">
            <figure className="">
              <img src={img} alt="" className="md:h-[20rem]  h-[12rem]  " />
            </figure>
            <form
              action=""
              onSubmit={handleForm}
              className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-6"
            >
              <div className="flex flex-col">
                <label htmlFor="voterId" className="sm:text-[18px] ">
                  Voter ID:
                </label>

                <input
                  className="border-2 p-2 rounded "
                  type="text"
                  id="voterId"
                  name="voterId"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  autoComplete="off"
                  required
                  placeholder="***-***-***"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="citizenshipNumber" className="sm:text-[18px]">
                  CitizenShip Number:
                </label>
                <input
                  className="border-2 p-2 rounded "
                  type="text"
                  id="citizenshipNumber"
                  name="citizenshipNumber"
                  value={citizenshipNumber}
                  onChange={(e) => setCitizenshipNumber(e.target.value)}
                  placeholder="***-***-***"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="sm:text-[18px]">
                  Email:
                </label>
                <input
                  className="border-2 p-2 rounded "
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="jonhdoe@gmail.com"
                />
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div>
                <input
                  type="submit"
                  value="Send Otp"
                  className="border-none cursor-pointer md:p-4 p-2 w-full rounded bg-[#12529C] text-white mb-2"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAdminLogState } from "../../recoil/atoms";
import adminAuth from "../../hook/adminAuth";
// import "../styles/AdminLogin.scss";

function AdminLogin() {
  adminAuth(true);
  // const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLogged, setAdminlogged] = useRecoilState(isAdminLogState);
  const navigate = useNavigate();

  const handleAdmin = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        email,
        password,
      });
      if (response.status == 200) {
        setAdminlogged(true);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // setAdminlogged(false);

  return (
    !adminLogged && (
      <section className=" flex justify-center items-center  py-28 ">
        <div className="px-6 flex md:gap-8 flex-col pt-40 md:pt-0 pb-4 max-w-[1440px] ">
          <h1 className="text-center md:text-[52px] text-[26px] pb-4  sm:block  font-semibold text-[#12529C]">
            Admin Login
          </h1>
          <div className="">
            <form
              onSubmit={handleAdmin}
              className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-6"
            >
              <div className="flex flex-col">
                <label htmlFor="email" className="sm:text-[18px] ">
                  {" "}
                  Email:
                </label>{" "}
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 p-2 rounded "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="sm:text-[18px]">
                  {" "}
                  Password:
                </label>{" "}
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 p-2 rounded "
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="LogIn"
                  className="border-none cursor-pointer  p-2 w-full rounded bg-[#12529C] text-white mb-2"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  );
}

export default AdminLogin;

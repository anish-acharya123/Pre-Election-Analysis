import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAdminLogState } from "../recoil/atoms";
import "../styles/AdminLogin.scss";

function AdminLogin() {
  // const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLogged, setAdminlogged] = useRecoilState(isAdminLogState);
  const navigate = useNavigate();
  // window.location.reload();

  const handleAdmin = async (e) => {
    e.preventDefault();

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
      <div className="admin_main">
        <div className="adminlogin_wrapper">
          <h1>Admin Login</h1>
          <div className="adminlogin_form">
            <form onSubmit={handleAdmin}>
              <div className="adminlogin_input">
                <div className="adminlogin_labelInput">
                  <label htmlFor="email"> Email:</label> <br />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="adminlogin_labelInput">
                  <label htmlFor="password"> Password:</label> <br />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input type="submit" value="LogIn" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default AdminLogin;

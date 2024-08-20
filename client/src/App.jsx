import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Otp from "./components/Otp";
import Navbar from "./components/navbar/Navbar";
import Analysis from "./components/Analysis";
import NotFound from "./components/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import Votingpage from "./components/Votingpage";
import AdminDashboard from "./components/AdminDashboard";
import EachCandidate from "./components/EachCandidate";
import AdminLogin from "./components/AdminLogin";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <RecoilRoot>
      <Router>
        <div className="router">
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route path="/otp" Component={Otp} />
            <Route path="/analysis" Component={Analysis} />
            <Route path="/adminlogin" Component={AdminLogin} />
            <Route path="/votingpage" Component={Votingpage} />
            <Route path="/admin-dashboard" Component={AdminDashboard} />
            <Route path="/candidate/:id" Component={EachCandidate} />
            <Route path="/*" Component={NotFound} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;

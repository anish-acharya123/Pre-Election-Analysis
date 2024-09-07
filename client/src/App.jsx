import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Otp from "./components/Otp";
import Navbar from "./components/navbar/Navbar";
import Analysis from "./components/Analysis/Analysis";
import NotFound from "./components/NotFound";
import Votingpage from "./components/votingsection/Votingpage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EachCandidate from "./components/Admin/EachCandidate";
import AdminLogin from "./components/Admin/AdminLogin";
import Userguide from "./components/votingsection/Userguide";
import Footer from "./components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "./i18n";
import "./App.css";
import FAQ from "./components/FAQ";
import CandidatesList from "./components/Candidates/CandidatesList";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <RecoilRoot>
      <Router>
        <div className="router overflow-hidden">
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route path="/otp" Component={Otp} />
            <Route path="/analysis" Component={Analysis} />
            <Route path="/faqs" Component={FAQ} />
            <Route path="/adminlogin" Component={AdminLogin} />
            <Route path="/userguide" Component={Userguide} />
            <Route path="/votingpage" Component={Votingpage} />
            <Route path="/admin-dashboard" Component={AdminDashboard} />
            <Route path="/candidate" Component={CandidatesList} />
            <Route path="/candidate/:id" Component={EachCandidate} />
            <Route path="/*" Component={NotFound} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;

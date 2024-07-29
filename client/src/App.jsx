import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles/app.scss";
import Home from "./components/Home";
import Login from "./components/Login";
import Otp from "./components/Otp";
import Navbar from "./components/Navbar";
import Analysis from "./components/Analysis";
import NotFound from "./components/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="router">
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route
            exact
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/otp"
            element={isLoggedIn ? <Otp /> : <Navigate to="/login" />}
          />
          <Route path="/analysis" Component={Analysis} />
          <Route path="/*" Component={NotFound} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

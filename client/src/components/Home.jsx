import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate();
  const handlebtn = () => {
    // e.preventDefault();
    navigate("/login");
  };
  return (
    <div className="home_main">
      <div className="overlay">
        <div className="home_wrapper">
          <h1>
            <Typewriter
              options={{
                strings: ["Analyze Your Valuable Vote Through Single Site."],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <h3>{"( Please read before vote to your candidate. )"}</h3>

          <button className="home-btn" onClick={handlebtn}>
            Vote Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { navState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

import "../styles/Home.scss";

function Home() {
  const [navColor, setNavColor] = useRecoilState(navState);
  const navigate = useNavigate();
  setNavColor(false);
  const handlebtn = () => {
    setNavColor(true);
    // e.preventDefault();
    navigate("/login");
  };
  return (
    <div className="home_main"> 
      <div className="overlay">
        <div className="home_wrapper">
          <h1 data-aos="fade-up" data-aos-duration="1000">
            <Typewriter
              options={{
                strings: ["Analyze Your Valuable Vote Through Single Site."],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <h3 data-aos="fade-up" data-aos-duration="1500">
            {"( Read the description carefully before vote your candidate)"}
          </h3>

          <button
            className="home-btn"
            data-aos="fade-up"
            data-aos-duration="2000"
            onClick={handlebtn}
          >
            Vote Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

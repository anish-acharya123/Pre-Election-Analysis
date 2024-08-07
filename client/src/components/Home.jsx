import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/votingImage/hi.png";
import Typewriter from "typewriter-effect";
import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate();

  const handlebtn = () => {
    navigate("/login");
  };
  return (
    <div className="home_main">
      <div className="home_wrapper">
        <div className="homeleft-section">
          <h1 data-aos="fade-up" data-aos-duration="1000">
            <span>Analyze Your Valuable Vote Through a Single Site. </span>
            {/* <Typewriter
              options={{
                strings: [" Through Single Site."],
                autoStart: true,
                loop: true,
              }}
            /> */}
          </h1>
          <p data-aos="fade-up" data-aos-duration="1500">
            Welcome to Online voting platform.
          </p>

          <button
            className="home-btn"
            data-aos="fade-up"
            data-aos-duration="2000"
            onClick={handlebtn}
          >
            Vote Now
          </button>
        </div>
        <div
          className="homeright-section"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="homehi-user">
            Hi
            <span style={{ color: "rgb(0, 106, 110)" }}> User</span>, what are
            you doing? Please Vote Carefully.
          </div>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

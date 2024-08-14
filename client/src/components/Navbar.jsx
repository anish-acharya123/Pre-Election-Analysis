import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { navState } from "../recoil/atoms";
// import { useRecoilValue } from "recoil";
import Logo from "../assets/logo/logo.svg";
import "../styles/Navbar.scss";
import hamburger from "../assets/logo/hamburger.png";
import cross from "../assets/logo/cross.png";

function Navbar() {
  const [click, setClick] = useState(false);
  // const navColor = useRecoilValue(navState);

  const handleAction = () => {
    setClick(!click);
  };

  return (
    <nav className={`navbar_main ${"nav_color"}`}>
      <div className="navbar_wrapper">
        <div className="navbar_left">
          <img src={Logo} alt="img not found" />
          {/* <span> EAS</span> */}
        </div>
        <div className={`navbar_right ${click ? "nav_display" : ""}`}>
          <ul>
            <li>
              <Link to="/" className="nav_link">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/analysis " className="nav_link">
                Analysis
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/contact" className="nav_link">
                Contact
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/fyq" className="nav_link">
                FAQs
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={handleAction}>
            {click ? <img src={cross} alt="ham" /> : <img src={hamburger} alt="ham" />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { navState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import Logo from "../assets/logo/logo.svg";
import "../styles/Navbar.scss";

function Navbar() {
  const navColor = useRecoilValue(navState);
  return (
    <nav className={`navbar_main ${"nav_color"}`}>
      <div className="navbar_wrapper">
        <div className="navbar_left">
          <img src={Logo} alt="img not found" />
          {/* <span> EAS</span> */}
        </div>
        <div className="navbar_right">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.svg";
import "../styles/Navbar.scss";
import hamburger from "../assets/logo/hamburger.png";
import cross from "../assets/logo/cross.png";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleAction = () => {
    setClick(!click);
  };

  return (
    <nav className=" py-6  flex items-center justify-center shadow-md">
      <div className="flex items-center justify-between  max-w-[1440px] px-8 w-full  ">
        <figure>
          <img
            src={Logo}
            alt="AEAS"
            className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]"
          />
        </figure>

        <div>
          <ul className="hidden lg:flex gap-8 font-semibold">
            <li>
              {" "}
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/analysis">Analysis</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li>
            <li>
              <NavLink>FAQ</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 items-center">
          <button className=" lg:text-[16px] border-2 border-[#12529C] text-[#12529C] text-[14px] p-2 rounded-md">
            Help?
          </button>
          <figure
            className="lg:hidden cursor-pointer transition-all"
            onClick={handleAction}
          >
            {click ? (
              <img src={cross} alt="" height={44} width={44} />
            ) : (
              <img src={hamburger} alt="" height={44} width={44} />
            )}
          </figure>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

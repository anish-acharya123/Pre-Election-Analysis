import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo/logo2.svg";
import hamburger from "../../assets/logo/hamburger.png";
import cross from "../../assets/logo/cross.png";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [click, setClick] = useState(false);
  const { t } = useTranslation();

  const handleAction = () => {
    setClick(!click);
  };

  return (
    <nav className="sticky py-6 top-0    flex items-center justify-center shadow-md bg-white  w-full z-30">
      <div className="flex items-center justify-between  max-w-[1440px] px-8 w-full  ">
        <figure>
          <img
            src={Logo}
            alt="AEAS"
            className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]"
          />
        </figure>

        <div>
          <ul className="hidden lg:flex gap-8 font-semibold md:text-[18px]">
            <li>
              {" "}
              <NavLink
                to="/"
                className={({ isActive }) => isActive && "text-[#12529C]"}
              >
                {t("navbar.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analysis"
                className={({ isActive }) => isActive && "text-[#12529C]"}
              >
                {t("navbar.analysis")}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/admin-dashboard'>{t("navbar.contact")}</NavLink>
            </li> */}
            <li>
              <NavLink
                to="/faqs"
                className={({ isActive }) => isActive && "text-[#12529C]"}
              >
                {t("navbar.faqs")}
              </NavLink>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        {/* <div className="flex gap-3 items-center"> */}
          {/* <button className=" lg:text-[16px] border-2 border-[#12529C] text-[#12529C] text-[14px] p-2 rounded-md">
            Help?
          </button> */}
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
        {/* </div> */}
      </div>
    </nav>
  );
}

export default Navbar;

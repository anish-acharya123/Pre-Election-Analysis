import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/logo/nepal.png";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handlebtn = () => {
    navigate("/login");
  };
  return (
    <section
      className=" flex justify-center  items-center max-h-[80vh]"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <div className="overflow-hidden relative max-w-[1440px] px-8 w-full flex flex-col gap-8 sm:pt-28  pt-12 pb-6 flex-1">
        <h1 className="sm:text-[45px] lg:text-[55px] text-[30px] font-bold md:max-w-[65rem] z-50">
          {" "}
          {/* ANALYZE YOUR VALUABLE <span className="text-[#12529C]">
            VOTE
          </span>{" "}
          THROUGH A SINGLE SITE! */}
          {t("homepage.header.first")}{" "} <br className="md:block hidden" />
          <span className="text-[#12529C]">{t("homepage.header.second")}</span>{" "}
          {t("homepage.header.third")}
        </h1>
        <div
          className="flex gap-2 flex-col "
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          <h3 className="sm:text-[20px] text-[12px]">
            {" "}
            {t("homepage.subheader.first")}
          </h3>
          <h3 className="sm:text-[20px] text-[12px]">
            {t("homepage.subheader.second")}
          </h3>
        </div>
        <div
          className="flex flex-col gap-4 "
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-once="true"
        >
          <p className="font-bold">{t("homepage.welcome_message")}</p>
          <button
            className="bg-[#12529C] hover:bg-white hover:text-[#12528C]  transition-all border-2 border-[#12528c] b text-white p-4 sm:w-[15rem] w-[12rem] sm:text-[16px] text-[15px] rounded"
            onClick={handlebtn}
          >
            {t("homepage.buttons.vote_now")}
          </button>
          <button className="border-2  border-[#12529C] p-4 sm:w-[15rem]  w-[12rem] sm:text-[16px] text-[15px] rounded">
            {t("homepage.buttons.candidate_list")}
          </button>
        </div>

        <div className="hidden md:block absolute p-8 right-0 bottom-0 translate-y-[5rem]  translate-x-20">
          <figure>
            <img
              src={img}
              alt=""
              className="lg:h-[40rem] lg:w-[40rem] md:h-[30rem] md:w-[30rem] sm: "
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Home;

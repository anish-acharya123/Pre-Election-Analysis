import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isAdminLogState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import CandidateManage from "./CandidateManage";
import VoteTimeManage from "./voteTimeManage";
import Analysis from "../Analysis/Analysis";
import Admin from "./AdminLogin";
import adminAuth from "../../hook/adminAuth";
// import "../styles/AdminDashboard.scss";

function AdminDashboard() {
  adminAuth(false);
  const [activeSection, setActiveSection] = useState("candidate");
  const adminLogged = useRecoilValue(isAdminLogState);
  const navigate = useNavigate();

  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  // useEffect(() => {
  //   if (!adminLogged) {
  //     navigate("/adminlogin");
  //   }
  // }, []);

  // console.log(adminLogged);

  return (
    adminLogged && (
      <section className=" flex justify-center items-center ">
        <div className="flex  flex-col justify-evenly items-center w-full gap-22 md:gap-0">
          <div className="bg-[#12528c] text-white py-2  md:py-4 flex justify-center gap-10 w-full">
            <div className="max-w-[1440px] flex justify-end gap-10 w-full px-6">
              <button
                className="text-[12px] md:text-[16px]"
                onClick={() => handlesectionChange("candidate")}
              >
                Manage Candidate
              </button>

              <button
                className="text-[12px] md:text-[16px]"
                onClick={() => handlesectionChange("analysis")}
              >
                Manage Analysis
              </button>
              <button
                className="text-[12px] md:text-[16px]"
                onClick={() => handlesectionChange("voteTime")}
              >
                Manage VoteTime
              </button>

              {/* <button
                className="text-[12px] md:text-[16px]"
                onClick={() => handlesectionChange("admin")}
              >
                Manage Admins
              </button> */}
            </div>
          </div>

          <div className=" max-w-[1440px] px-6 w-full">
            {activeSection === "candidate" && <CandidateManage />}
            {activeSection === "analysis" && <Analysis />}
            {activeSection === "voteTime" && <VoteTimeManage />}
          </div>
        </div>
      </section>
    )
  );
}

export default AdminDashboard;

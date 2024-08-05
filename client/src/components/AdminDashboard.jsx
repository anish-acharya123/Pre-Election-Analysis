import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isAdminLogState } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";
import CandidateManage from "./CandidateManage";
import Analysis from "./Analysis";
import Admin from "./AdminLogin";
import "../styles/AdminDashboard.scss";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("candidate");
  const adminLogged = useRecoilValue(isAdminLogState);
  const navigate = useNavigate();

  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if (!adminLogged) {
      navigate("/adminlogin");
    }
  }, []);

  console.log(adminLogged);

  return (
    adminLogged && (
      <div className="admin-dashboard">
        <div className="admin-dashobard-wrapper">
          <div className="admin-overlay">
            <div>
              <button
                className="dashboard-btn"
                onClick={() => handlesectionChange("candidate")}
              >
                Manage Candidate
              </button>
            </div>
            <div>
              <button
                className="dashboard-btn"
                onClick={() => handlesectionChange("analysis")}
              >
                Manage Analysis
              </button>
            </div>
            <div>
              <button
                className="dashboard-btn"
                onClick={() => handlesectionChange("admin")}
              >
                Manage Admins
              </button>
            </div>
          </div>
        </div>

        <div className="admin-control">
          {activeSection === "candidate" && <CandidateManage />}
          {activeSection === "analysis" && <Analysis />}
          {activeSection === "admin" && <Admin />}
        </div>
      </div>
    )
  );
}

export default AdminDashboard;

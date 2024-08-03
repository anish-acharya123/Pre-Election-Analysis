import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.scss";
import CandidateManage from "./CandidateManage";
import Analysis from "./Analysis";
import Admin from "./Admin";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("candidate");

  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  return (
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
  );
}

export default AdminDashboard;

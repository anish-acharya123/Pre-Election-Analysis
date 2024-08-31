import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAdminLogState } from "../recoil/atoms";
import { useParams, useNavigate } from "react-router-dom";
import adminAuth from "../hook/adminAuth";
import "../styles/Eachcandidate.scss";
import EditForm from "./EditForm";

function EachCandidate() {
  // adminAuth(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);

  const adminLogged = useRecoilValue(isAdminLogState);
  const Params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/candidate/${Params.id}`
      );
      setData(response.data);
    };
    fetchData();
  }, [Params.id]);

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/candidate/${Params.id}`
      );
      if (response.status === 200) {
        console.log(response.data.msg);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.error(error.response.data.msg);
      } else if (error.response.status === 500) {
        console.error(error.response.data.msg);
      }
      console.error("There was an error deleting the candidate!", error);
    }
  };

  useEffect(() => {
    if (!adminLogged) {
      navigate("/adminlogin");
    }
  });

  return (
    adminLogged && (
      <section className="py-10 flex justify-center items-center">
        <div className="max-w-[1440px] px-6 bg-red-50 w-full">
          <div className="">
            <div className="flex md:flex-row flex-col justify-center items-center">
              <img src={data.photo} alt={data.name} className="h-52 w-52 mix-blend-multiply" />
              <div className="">
                <div>
                  <strong>Name: </strong> {data.name}
                </div>
                <div>
                  <strong>Party: </strong> {data.party}
                </div>
                <div>
                  <strong>CandidateId :</strong> {data.candidateId}
                </div>
                <div>
                  <strong>Description: </strong> {data.description}
                </div>
              </div>
            </div>
            <div className="">
              <button className="edit" onClick={() => setForm(true)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteData()}>
                Delete
              </button>
            </div>
          </div>

          <div className={`${form ? " block" : "hidden"} `}>
            <EditForm
              Cname={data.name}
              Cparty={data.party}
              CcandidateId={data.candidateId}
              Cdescription={data.description}
              Cphoto={data.photo}
              setForm={setForm}
            />
          </div>
        </div>
      </section>
    )
  );
}

export default EachCandidate;

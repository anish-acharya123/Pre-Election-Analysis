import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAdminLogState } from "../../recoil/atoms";
import { useParams, useNavigate } from "react-router-dom";
import adminAuth from "../../hook/adminAuth";
// import "../styles/Eachcandidate.scss";
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
      <section className=" flex justify-center items-center py-52 ">
        <div className="max-w-[1440px] px-6">
          <div className="relative">
            <div className="bg-gray-200 p-4 rounded-md flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col md:flex-row items-center justify-center text-[14px] md:text-[16px] ">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="h-52 w-52 mix-blend-multiply"
                />
                <div className="max-w-[40rem]">
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
              <div className=" flex gap-4">
                <button
                  className="text-center border-none outline-none   bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
                  onClick={() => setForm(true)}
                >
                  Edit
                </button>
                <button
                  className="text-center  bg-red-500 text-white border-none outline-none w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
                  onClick={() => deleteData()}
                >
                  Delete
                </button>
              </div>
            </div>

            <div
              className={`${
                form ? " block absolute top-0 bg-white border-4 p-4 " : "hidden"
              } `}
            >
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
        </div>
      </section>
    )
  );
}

export default EachCandidate;

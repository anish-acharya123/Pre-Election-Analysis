import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, voterIdState, emailState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import hi from "../assets/votingImage/hi.png";
import "../styles/Votingpage.scss";
import axios from "axios";

function Votingpage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const voterId = useRecoilValue(voterIdState);
  const email = useRecoilValue(emailState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/profile?voterId=${voterId}&email=${email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    // console.log(user.name);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/candidate/list"
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchUser();
    fetchData();
  }, [isLoggedIn, navigate, voterId, email]);

  return (
    isLoggedIn && (
      <div className="votingpage_main">
        <div className="votingpage_wrapper">
          <div
            className="votingpage_title"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {" "}
            Please Choose Your Candidate Carefully:{" "}
          </div>
          <div className="votingSection">
            <div
              className="votingImage"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <div className="votingpage-hi">
                Hi {user.name}, what are you doing? Please Vote Carefully.
              </div>
              <img src={hi} alt="hi image" />
            </div>
            <div
              className="votingpage_candidatesection"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              {data.map((candidate) => (
                <div key={candidate._id} className="votingpage-candidatecard">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="votingpage-candidateimage"
                  />
                  <div>
                    <strong>{candidate.name}</strong> <br />
                    <strong>Party:</strong> {candidate.party}
                    <br />
                    {/* <strong>Candidate ID:</strong> {candidate.candidateId} */}
                    <div className="votinpage-description">
                      <strong>Description:</strong>{" "}
                      {candidate.description.slice(0, 25) + " .............."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Votingpage;

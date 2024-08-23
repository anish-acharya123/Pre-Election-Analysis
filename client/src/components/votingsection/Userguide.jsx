import React, { useEffect, useState } from "react";
import {
  isLoggedInState,
  voterIdState,
  emailState,
  voterinfoState,
} from "../../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Userguide() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(voterinfoState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const voterId = useRecoilValue(voterIdState);
  const email = useRecoilValue(emailState);
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
        setUser({
          name: response.data.user.name,
          gender: response.data.user.gender,
          age: response.data.user.age,
        });
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, [voterId, email, isLoggedIn]);

  console.log(user);
  return (
    isLoggedIn && (
      <section className="flex items-center justify-center  py-10 ">
        <div className="max-w-[1440px] w-full px-6">
          <h1 className="text-center md:text-[32px] text-[20px]  sm:block  font-semibold ">
            Hi <span className="text-[#12529C]">{user.name || "User"}</span> ,
            Go through user guide before select to your candidate.
          </h1>
          <div className="flex flex-col pt-10 items-center gap-4">
            {/* bg-user-guide bg-cover bg-center */}
            <div className="bg-gray-100 p-10 rounded-md ">
              <h1 className="text-center md:text-[32px] text-[20px]  sm:block  font-semibold text-[#12529C]">
                User Guide
              </h1>
              <div>
                <ol className="list-decimal list-inside grid gap-8 pt-4">
                  <li>
                    <strong>Verify Your Choice:</strong> Ensure you carefully
                    review your choice before casting your vote.
                  </li>
                  <li>
                    <strong>Single Vote Policy:</strong> Each voter is permitted
                    to cast only one vote. Once submitted, your vote cannot be
                    changed or repeated.
                  </li>
                  <li>
                    <strong>Results Viewing:</strong> Results will be available
                    in the analysis section of the page after the voting period
                    concludes.
                  </li>
                  <li>
                    <strong>Confidentiality:</strong> Vote responsibly and keep
                    your vote confidential. Do not share your choice with
                    others.
                  </li>
                </ol>

                <br />
                <p>
                  Your vote is your voice. Make it count by carefully
                  considering each candidate's vision and how it aligns with
                  your values and the needs of our community.
                </p>
              </div>
            </div>
            <div>
              <button
                className="border-none rounded bg-[#12529C] text-white py-4 px-8"
                onClick={() => navigate("/votingpage")}
              >
                Ready to Vote
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default Userguide;

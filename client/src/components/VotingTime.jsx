import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { voteStartTimeState, voteEndTimeState } from "../recoil/atoms";
import axios from "axios";

const VotingTime = () => {
//   const [votingEnabled, setVotingEnabled] = useState(false);
  const [votingStartTime, setVotingStartTime] =
    useRecoilState(voteStartTimeState);
  const [votingEndTime, setVotingEndTime] = useRecoilState(voteEndTimeState);
  useEffect(() => {
    const fetchVotingConfig = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/admin/get-voting-config"
        );
        console.log(data);
        if (data) {
        //   setVotingEnabled(data.votingEnabled);
          if (data.votingStartTime) {
            const localStartTime = new Date(
              data.votingStartTime
            ).toLocaleString("en-US", {
              timeZone: "Asia/Kathmandu", // Replace with your desired time zone
            });
            setVotingStartTime(localStartTime);
          } else {
            setVotingStartTime(null);
          }
          if (data.votingEndTime) {
            const localEndTime = new Date(data.votingEndTime).toLocaleString(
              "en-US",
              {
                timeZone: "Asia/Kathmandu",
              }
            );
            setVotingEndTime(localEndTime);
          } else {
            setVotingEndTime(null);
          }
        }
      } catch (error) {
        console.error("Error fetching voting config:", error);
      }
    };

    fetchVotingConfig();
  }, []);
  return (
    <div
      // className={`${votingStartTime && votingEndTime ? "block" : "hidden"}`}
      className=""
    >
      {votingStartTime && votingEndTime ? (
        <div>
          <p>
            <span className="text-[#12529C] font-bold">
              Election starts on:{" "}
            </span>
            {votingStartTime}
          </p>
          <p>
            <span className="text-[#12529C] font-bold">Election ends on: </span>
            {votingEndTime}
          </p>
        </div>
      ) : (
        <p className="text-red-500 font-bold">
          No Election is available right now.
        </p>
      )}
    </div>
  );
};

export default VotingTime;

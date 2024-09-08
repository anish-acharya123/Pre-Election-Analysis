import { useState } from "react";
import axios from "axios";
import VotingTime from "../VotingTime";
import { toast } from "react-toastify";

const VoteTimeManage = () => {
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [votingStartTime, setVotingStartTime] = useState("");
  const [votingEndTime, setVotingEndTime] = useState("");

  const updateVotingTime = async (e) => {
    console.log(votingStartTime, votingEndTime);
    e.preventDefault();
    await axios.post("http://localhost:3000/admin/toggle-voting", {
      votingEnabled,
      votingStartTime,
      votingEndTime,
    });
    toast.success("Voting time updated successfully");
  };

  return (
    <div className="md:py-10 py-4 flex flex-col justify-center items-center pb-20 gap-8  ">
      <h1 className="text-center  md:text-[52px] text-[32px]  py-4 sm:block  font-semibold text-[#12529C] leading-[100%]">
        Voting Time Management
      </h1>
      <VotingTime />
      <form
        onSubmit={updateVotingTime}
        className="flex flex-col justify-center items-center gap-10 w-full"
      >
        <div className="p-8 bg-gray-200 gap-4   flex flex-col md:flex-row  items-center lg:justify-between justify-center flex-wrap w-full">
          <div className="flex  gap-2">
            <label htmlFor="checkbox " className="sm:text-[20px]">
              Voting Enabled:
            </label>

            <input
              className="border-2 p-2 rounded cursor-pointer "
              type="checkbox"
              id="checkbox"
              required
              checked={votingEnabled}
              onChange={() => setVotingEnabled(!votingEnabled)}
            />
          </div>
          <div className="flex flex-col md:flex-row lg:gap-2">
            <label htmlFor="starttime" className="sm:text-[20px]">
              Voting Start Time:
            </label>

            <input
              className="border-2 p-1 rounded cursor-pointer"
              id="starttime"
              type="datetime-local"
              required
              value={votingStartTime}
              onChange={(e) => setVotingStartTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row lg:gap-2">
            <label htmlFor="endtime" className="sm:text-[20px]">
              Voting End Time:
            </label>

            <input
              className="border-2 p-1 rounded cursor-pointer"
              type="datetime-local"
              id="endtime"
              value={votingEndTime}
              onChange={(e) => setVotingEndTime(e.target.value)}
            />
          </div>
        </div>
        <button
          className=" border-none rounded-md bg-[#12529C] text-white py-4 px-10 w-fit  md:text-[16px] text-[12px]"
          type="submit"
        >
          Update Voting Time
        </button>
      </form>
    </div>
  );
};

export default VoteTimeManage;

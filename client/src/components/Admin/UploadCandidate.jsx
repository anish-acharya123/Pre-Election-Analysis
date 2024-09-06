import React, { useState } from "react";
import axios from "axios";
// import "../styles/UploadCandidate.scss";

function UploadForm({ setUploadForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [party, setParty] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, party, candidateId, description, image);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("party", party);
    formData.append("candidateId", candidateId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/candidate/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage(`${response.data.msg}`);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage(error.response.data.msg);
      } else if (error.response.status === 500) {
        setMessage(error.response.data.msg);
      } else if (error.response.status === 400) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const cancleBtn = () => {
    setUploadForm(false);
    setMessage("");
    setName("");
    setDescription("");
    setParty("");
    setCandidateId("");
    setImage(null);
  };

  return (
    <div className="md:w-[25rem] w-[15rem] " >
      <h2 className="md:text-[26px] text-[20px] text-center">
        Upload Candidate Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="sm:text-[18px] ">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              className="border-2  rounded "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="party" className="sm:text-[18px]">
              Party:
            </label>
            <input
              type="text"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              name="party"
              className="border-2  rounded "
            />
          </div>
          <div className="flex flex-col">
            <label>Candidate ID:</label>
            <input
              type="text"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              name="candidateId"
              required
              className="border-2  rounded "
            />
          </div>
          <div className="flex flex-col">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image"
              className=" "
            />
          </div>
          <div className="flex flex-col">
            <label>Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows="3"
              cols="50"
              className="border-2  rounded "
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 py-4">
          <button
            className="rounded border-2 px-4 py-2 md:text-[16px] text-[12px] text-center"
            onClick={(e) => cancleBtn()}
          >
            cancle
          </button>
          <button
            type="submit"
            className="text-center  bg-[#12529C] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
          >
            Upload
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;

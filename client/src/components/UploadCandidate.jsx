import React, { useState } from "react";
import axios from "axios";
import "../styles/UploadCandidate.scss";

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
    <div>
      <h2>Upload Candidate Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="candidateForm_inputs">
          <div className="candidateForm_input">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
            />
          </div>

          <div className="candidateForm_input">
            <label>Party:</label>
            <input
              type="text"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              name="party"
            />
          </div>
          <div className="candidateForm_input">
            <label>Candidate ID:</label>
            <input
              type="text"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              name="candidateId"
              required
            />
          </div>
          <div className="candidateForm_input">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image"
            />
          </div>
          <div className="candidateForm_input full-width">
            <label>Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows="3"
              cols="50"
            />
          </div>
        </div>
        <div className="candidateForm_btn">
          <button
            className="candidateForm_cancle candidateFormsubmit_btn"
            onClick={(e) => cancleBtn()}
          >
            cancle
          </button>
          <button
            type="submit"
            className="candidateForm_submit candidateFormsubmit_btn"
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

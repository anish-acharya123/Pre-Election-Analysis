import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/UploadCandidate.scss";

function EditForm({
  Cname = "",
  Cparty = "",
  CcandidateId = "",
  Cdescription = "",
  Cphoto,
  setForm,
}) {
  const [name, setName] = useState(Cname);
  const [description, setDescription] = useState(Cdescription);
  const [party, setParty] = useState(Cparty);
  const [candidateId, setCandidateId] = useState(CcandidateId);
  const [image, setImage] = useState(Cphoto);
  const [message, setMessage] = useState("");
  const params = useParams();
  const initialDataRef = useRef({});

  useEffect(() => {
    initialDataRef.current = {
      name: Cname,
      description: Cdescription,
      party: Cparty,
      image: Cphoto,
      candidateId: CcandidateId,
    };
    setName(Cname);
    setDescription(Cdescription);
    setParty(Cparty);
    setCandidateId(CcandidateId);
    setImage(Cphoto);
  }, [Cname, Cdescription, Cparty, CcandidateId, Cphoto]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name !== initialDataRef.current.name) {
      formData.append("name", name);
    }
    if (description !== initialDataRef.current.description) {
      formData.append("description", description);
    }
    if (party !== initialDataRef.current.party) {
      formData.append("party", party);
    }
    if (candidateId !== initialDataRef.current.candidateId) {
      formData.append("candidateId", candidateId);
    }
    if (image !== initialDataRef.current.image && image !== null) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/candidate/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage(`${response.data.msg}`);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.msg);
      } else if (error.response.status === 500) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const cancleBtn = (e) => {
    e.preventDefault();
    setForm(false);
    setMessage("");
    setImage(Cphoto);
  };

  return (
    <div>
      <h2>Update Candidate Information</h2>
      <form onSubmit={handleEdit}>
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
            {image && (
              <div>
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Current Candidate"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
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
            onClick={cancleBtn}
          >
            cancle
          </button>
          <input
            type="submit"
            className="candidateForm_submit candidateFormsubmit_btn"
            value="Update"
          />
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Stylesheets/details.css";

export default function Details({ user }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");

  function handleSave() {
    if (!name || !age || !mobile || !gender) {
      alert("Please fill all details");
      return;
    }

    const userDetails = {
      username: user?.username,
      password: user?.password,
      name,
      age: Number(age),
      mobile,
      gender,
    };

    console.log("User Details:", userDetails);

    // TODO: store userDetails (API / localStorage)

    navigate("/postspage");
  }

  return (
    <div className="details-container">
      <div className="details-box">
        <h2 className="details-title">Enter Your Details</h2>

        <input
          className="details-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="details-input"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="details-input"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <select
          className="details-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button className="details-btn" onClick={handleSave}>
          Save Details
        </button>
      </div>
    </div>
  );
}

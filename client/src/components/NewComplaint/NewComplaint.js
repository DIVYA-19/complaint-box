import "./NewComplaint.css";
import Alert from "@mui/material/Alert";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServices from "../../services/apiServices";

const NewComplaint = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState({
    category: "",
    priority: "",
    area: "",
    pincode: "",
  });
  const textareaRef = useRef(null);
  const [error, setError] = useState("");
  var navigate = useNavigate();

  const propertyValues = {
    category: ["Water", "Electricity", "Land"],
    priority: ["Low", "Medium", "High"],
    area: ["Ongole", "Tangutur"],
    pincode: ["002020", "909090"],
  };

  const saveComplaint = async () => {
    console.log("heloo");
    var msg = "";

    if (title === "") {
      msg += " " + "title" + ",";
    }
    Object.keys(details).map((detail) => {
      if (details[detail] === "") msg += " " + detail + ",";
    });
    if (description === "") {
      msg += " " + "description" + ",";
    }
    if (msg) {
      msg += " values are missing!!!";
    }
    if (description !== "" && description.length < 15) {
      msg += "\n description should have atleast 15 charectors";
    }
    if (msg !== "") {
      setError(msg);
    } else {
      const body = {
        title: title,
        desc: description,
        category: details.category,
        priority: details.priority,
        pincode: details.pincode,
        address: details.area,
      };

      const newComplaintCreated = await APIServices.createNewComplaint(body);
      if (newComplaintCreated) {
        navigate("/complaints");
      } else {
        setError("Something went wrong. Please try again...");
      }
    }
  };

  useEffect(() => {}, []);
  function OnInput(e) {
    console.log(e);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight > 120
        ? textareaRef.current.scrollHeight + "px"
        : "120px";
  }

  return (
    <div className="new-complaint-conainer">
      <div className="complaint-header">
        {error && (
          <Alert severity="error" className="error-msg">
            {error}
          </Alert>
        )}
        <div className="wrap">
          <div className="complaint-id">
            <span className="mand-star">*</span>Title:{" "}
          </div>
          <div className="complaint-title">
            <input
              className="title-input"
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="details">
          <div className="header-controls">
            <div className="comments-count">0 comments</div>
            {/* <div className="category">Tags: Water</div> */}
          </div>
          <div className="save-button">
            <button className="save-btn" onClick={saveComplaint}>
              save
            </button>
          </div>
        </div>
        <div className="content">
          <div className="desc">
            <div className="desc-title">
              <span className="mand-star">*</span>Description{" "}
            </div>
            <textarea
              className="desc-input"
              value={description}
              ref={textareaRef}
              onChange={(e) => {
                OnInput();
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="properties">
            {Object.keys(propertyValues).map((property) => (
              <div className="property" key={property}>
                <span className="property-name">
                  <span className="mand-star">*</span>
                  {property}
                </span>
                <select
                  onChange={(e) =>
                    setDetails({ ...details, [property]: e.target.value })
                  }
                >
                  <option>select</option>
                  {propertyValues[property].map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;

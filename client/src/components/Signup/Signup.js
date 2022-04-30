import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServices from "../../services/apiServices";

const Signup = () => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {
    var userCreated = await APIServices.signup({ email, name, password });
    if (userCreated) {
      navigate("/signin");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <TextField
          id="outlined-size-small"
          placeholder="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-size-small"
          placeholder="full name"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-size-small"
          placeholder="password"
          size="small"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-size-small"
          placeholder="confirm password"
          size="small"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "#32005c", color: "#fff" }}
          variant="outlined"
          onClick={signup}
        >
          Sign Up
        </Button>
      </div>
      <Link to="/signin" className="signin-link">
        already have an account? signin
      </Link>
    </div>
  );
};

export default Signup;

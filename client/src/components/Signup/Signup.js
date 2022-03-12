import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = () => {
    fetch(process.env.API_URL + "api/auth/signup/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      });
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
      <Link to="/signin">
        <a className="signin-link">already have an account? signin</a>
      </Link>
    </div>
  );
};

export default Signup;

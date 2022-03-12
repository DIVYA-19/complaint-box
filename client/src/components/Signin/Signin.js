import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Signin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    fetch(process.env.API_URL + "api/auth/signin/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          navigate("/complaints");
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
          placeholder="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "#32005c", color: "#fff" }}
          variant="outlined"
          onClick={signin}
        >
          Signin
        </Button>
      </div>
      <Link to="/signup">
        <a className="signup-link">don't have an account? signup</a>
      </Link>
    </div>
  );
};

export default Signin;

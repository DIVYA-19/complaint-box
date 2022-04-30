import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Signin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServices from "../../services/apiServices";
import TokenServices from "../../services/tokenServices";

const Signin = () => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    var user = await APIServices.signin({email, password})
    if (user) {
      TokenServices.setUser(user);
      navigate("/complaints");
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
          placeholder="password"
          size="small"
          value={password}
          type="password"
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
      <Link to="/signup" className="signup-link">
        don't have an account? signup
      </Link>
    </div>
  );
};

export default Signin;

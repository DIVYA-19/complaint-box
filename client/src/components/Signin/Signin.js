import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Signin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { signin } from "../../store/actions";
import { useSelector } from "react-redux";

const Signin = (props) => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useSelector((state) => state.data)

  const signin = async () => {
    await props.signin(email, password)
    if (data.user) {
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

function mapStateToProps(state, props) {
  console.log(state)
  return {
    ...state,
    user: state.data.user,
    isLoggedIn: state.data.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signin: (email, password) => {
      return fetch(process.env.API_URL + "api/auth/signin/", {
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
          var user = res.user;
          if (user.token) {
           dispatch(signin(user, true))
          }
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

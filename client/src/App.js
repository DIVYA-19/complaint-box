import React from "react";
import "./App.css";
import Complaints from "./components/Complaints/Complaints";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/complaints" element={<Complaints />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

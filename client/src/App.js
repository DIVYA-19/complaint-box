import React from "react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./App.css";
import Complaints from "./components/Complaints/Complaints";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import RequireAuth from "./requireAuth";

function requireAuth() {
  const token = localStorage.getItem("@token");
  console.log("requie auth ", token);
  if (!token) <Navigate path="/signin" />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate replace to="/complaints" />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route element={<RequireAuth />}>
              <Route
                exact
                path="/complaints"
                element={<Complaints />}
                onEnter={requireAuth}
              />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

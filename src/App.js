import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import ChatApp from "./components/chat";
import LandingPage from "./components/landingPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      await setUser(user);
    });
  });
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/landPage" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

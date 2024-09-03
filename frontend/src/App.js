import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";
import ChatApp from "./components/Chat";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Url from "./components/Url";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      await setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/landPage" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/landPage" element={<LandingPage />} />
        <Route path="/url" element={<Url />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaHistory,
  FaHome,
  FaInfo,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import axios from "axios";

const Url = () => {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendRequest = async () => {
    if (url.trim() === "" || prompt.trim() === "") return;

    setResponse("Processing...");

    try {
      const result = await axios.post("http://localhost:5000/process-url", {
        url,
        prompt,
      });
      setResponse(result.data.message);
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse("An error occurred while processing the request.");
    }
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundImage: `url('/botuser.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 ${
          darkMode ? "bg-gray-800" : "bg-gray-300"
        } text-white h-full transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <a
                href="/landPage"
                className="flex items-center p-2 bg-blue-500 hover:bg-blue-700 rounded text-white no-underline"
              >
                <FaHome className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/history"
                className="flex items-center p-2 bg-blue-500 hover:bg-blue-700 rounded text-white no-underline"
              >
                <FaHistory className="mr-2" /> History
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/about"
                className="flex items-center p-2 bg-blue-500 hover:bg-blue-700 rounded text-white no-underline"
              >
                <FaInfo className="mr-2" /> About
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 p-4 md:max-w-6xl md:mx-auto w-full ${
          sidebarOpen ? "blur-sm" : ""
        }`}
      >
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={toggleSidebar}
            className={`text-2xl ${
              darkMode
                ? "text-white hover:text-gray-400"
                : "text-gray-900 hover:text-blue-600"
            }`}
          >
            <FaBars />
            <h3 className="inline ml-2">Menu</h3>
          </button>
          <h1 className="text-2xl font-bold">Welcome, Studymate</h1>
          <button
            onClick={toggleDarkMode}
            className={`text-2xl ${
              darkMode
                ? "text-yellow-400 hover:text-yellow-500"
                : "text-gray-900 hover:text-blue-500"
            }`}
          >
            {darkMode ? (
              <p className="flex items-center">
                <FaSun className="mr-1" /> Light
              </p>
            ) : (
              <p className="flex items-center">
                <FaMoon className="mr-1" /> Dark
              </p>
            )}
          </button>
        </header>

        <div
          className={`flex-1 p-4 mb-4 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: darkMode
              ? "rgba(31, 41, 55, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* URL Input */}
          <div className="mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
              }`}
              placeholder="Enter the URL..."
            />
          </div>

          {/* Prompt Input */}
          <div className="mb-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`w-full p-2 border rounded-lg focus:outline-none ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
              }`}
              placeholder="Enter your prompt..."
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleSendRequest}
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Upload URL & Prompt
          </button>

          {response && (
            <div
              className={`p-4 rounded-lg mt-4 ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Url;

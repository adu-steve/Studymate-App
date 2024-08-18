import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaHistory,
  FaHome,
  FaInfo,
  FaSun,
  FaMoon,
  FaUserCircle,
  FaRobot,
} from "react-icons/fa";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null;
  });

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const sendMessage = async (message, file, history) => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setHistory((prevHistory) => [...prevHistory, userMessage.text]);
    setInput("");

    const loadingMessage = { sender: "ai", text: "..." };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMessage = async (message) => {
    await sendMessage(message, null, history);
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      await sendMessage("File uploaded", file);
    }
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "static-gradient-dark" : "static-gradient-light"
      }`}
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
          <button onClick={toggleSidebar}>
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
            className="text-2xl text-gray-500 hover:text-yellow-500"
          >
            <FaBars />
            <h3>Menu</h3>
          </button>
          <h1 className="text-2xl font-bold">SAC AI</h1>
          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-500 hover:text-blue-500"
          >
            {darkMode ? (
              <p>
                <FaSun />
                Light
              </p>
            ) : (
              <p>
                <FaMoon />
                Dark
              </p>
            )}
          </button>
        </header>
        <div
          id="chat-window"
          className={`flex-1 overflow-y-auto p-4 shadow rounded-lg mb-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex items-start ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="flex-shrink-0 mr-2">
                  <FaRobot className="text-xl fixed-size-icon ai-icon" />
                </div>
              )}
              <div
                className={`inline-block p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
                dangerouslySetInnerHTML={
                  msg.isHtml ? { __html: msg.text } : null
                }
              >
                {!msg.isHtml && msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="flex-shrink-0 ml-2">
                  <FaUserCircle className="text-xl fixed-size-icon user-icon" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 p-2 border rounded-l-lg focus:outline-none ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
            placeholder="Type a message..."
          />
          <button
            onClick={() => handleMessage(messages)}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="fixed bottom-4 left-4 p-4 flex items-center justify-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-20 h-32 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-200 text-black p-2 hover:bg-gray-300 transition duration-300 ease-in-out"
          style={{ display: "flex" }}
        />
        <p className="mt-2 text-center text-sm">Click here to upload a file</p>
      </div>
    </div>
  );
};

export default ChatApp;

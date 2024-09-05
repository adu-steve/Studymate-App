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
  FaPaperclip,
} from "react-icons/fa";
import axios from "axios";
import wallpaper from "./images/wallpaper.png"; // Use similar background image

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const sendMessage = async (message, file) => {
    if (message.trim() === "") return;
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("message", message);

    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const loadingMessage = { sender: "ai", text: "..." };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          sender: "ai",
          text: response.data.message,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          sender: "ai",
          text: "Error occurred.",
        };
        return updatedMessages;
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMessage = async () => {
    await sendMessage(input, null);
    setInput("");
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
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundImage: `url(${wallpaper})`,
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
          <h1 className="text-2xl font-bold">Chat with StudyMate</h1>
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
          id="chat-window"
          className={`flex-1 overflow-y-auto p-4 mb-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } rounded-lg`}
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: darkMode
              ? "rgba(31, 41, 55, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
          }}
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
                  <FaRobot className="text-xl" />
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
                  <FaUserCircle className="text-xl" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex mb-4">
          <div className="relative flex items-center">
            <input
              type="file"
              onChange={handleFileChange}
              id="file-input"
              className="hidden"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <FaPaperclip
                className={`text-2xl mx-2 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              />
            </label>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 p-2 border rounded-lg focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            placeholder="Type your message here..."
          />
          <button
            onClick={handleMessage}
            className={`ml-2 p-2 border rounded-lg ${
              darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

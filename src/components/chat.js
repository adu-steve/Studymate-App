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
  FaFileUpload,
} from "react-icons/fa";
import llmModel from "./llmModel"; // Import the llmModel function

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null; // Default to dark mode if no preference is saved
  });

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setHistory((prevHistory) => [...prevHistory, userMessage.text]);
    setInput("");

    // Show loading indicator
    const loadingMessage = { sender: "ai", text: "..." };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const aiResponse = await llmModel(input);
      const aiMessage = { sender: "ai", text: aiResponse };

      // Replace loading message with AI message
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.slice(0, -1); // Remove the loading message
        return [...updatedMessages, aiMessage];
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const userMessage = {
        sender: "user",
        text: `<img src="${event.target.result}" alt="Uploaded File" class="max-w-full h-auto rounded-lg" />`,
        isHtml: true, // Render as HTML
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "animated-gradient-dark" : "animated-gradient-light"
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
                href="#"
                className="flex items-center p-2 bg-blue-500 hover:bg-blue-700 rounded text-white no-underline"
              >
                <FaHome className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center p-2 bg-blue-500 hover:bg-blue-700 rounded text-white no-underline"
              >
                <FaHistory className="mr-2" /> History
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
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
        className={`flex flex-col flex-1 p-4 md:max-w-4xl md:mx-auto w-full ${
          sidebarOpen ? "blur-sm" : ""
        }`}
      >
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-500 hover:text-gray-900"
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold">AI Chat App</h1>
          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-500 hover:text-gray-900"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
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
                <FaRobot className="text-xl mr-2 fixed-size-icon ai-icon" />
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
                <FaUserCircle className="text-xl ml-2 fixed-size-icon user-icon" />
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
          <label className="bg-blue-500 text-white p-2 rounded-r-lg cursor-pointer">
            <FaFileUpload />
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="application/pdf"
            />
          </label>
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

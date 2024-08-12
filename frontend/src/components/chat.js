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
import { useDropzone } from "react-dropzone";
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

  //////

  const sendFileToLLMModel = async (file) => {
    console.log("Orignal file:", file);
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("history", JSON.stringify(history));

    // console.log("File Back: ", formData);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(file),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response from back end: ", response.json());
      const data = await response.json();
      return data.response; // Adjust based on your backend response structure
    } catch (error) {
      console.error("Error sending file:", error);
      return "Error processing file.";
    }
  };

  const sendMessage = async (message, file, fileType) => {
    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setHistory((prevHistory) => [...prevHistory, userMessage.text]);
    setInput("");

    // Show loading indicator
    const loadingMessage = { sender: "ai", text: "..." };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      console.log(message, file, fileType);
      const aiResponse = await llmModel(message, file, fileType, history);
      const aiMessage = { sender: "ai", text: aiResponse };

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

  const onDrop = async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      // const fileType = file.type;
      console.log("FILE: ", file);

      await sendFileToLLMModel(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, .pdf, .txt, .docx",
  });

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
          <h1 className="text-2xl font-bold">AI Chat App</h1>
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
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>

      {/* File Upload Area */}
      <div
        {...getRootProps({
          className:
            "dropzone fixed bottom-4 right-4 w-40 p-4 h-32 flex items-center justify-center cursor-pointer",
        })}
        className={`${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
        } border-2 border-dashed border-gray-500 rounded-lg mt-32 mr-10 h-44`}
      >
        <input {...getInputProps()} />
        <p className="m-10">
          Click here to upload file
          <FaRobot className="text-xl size-20 bg-cyan-500 " />
        </p>
      </div>
    </div>
  );
};

export default ChatApp;

import React, { useState, useEffect } from "react";
import { FaRobot, FaUpload, FaQuestionCircle } from "react-icons/fa";
import brand from "./images/study.png";

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOpenPage = () => {
    window.location.href = "/chat";
  };

  return (
    <div
      style={{
        backgroundImage: `url('wallpaper.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-200"
      }`}
    >
      {/* Header with Background Image */}
      <header className="text-white py-4 ">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-bold">StudyMateA</div>
          <nav className="space-x-8">
            <a
              href="/profile"
              className={`px-4 py-2 rounded-full no-underline ${
                isDarkMode
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Profile
            </a>
            <a
              href="/about"
              className={`px-4 py-2 rounded-full no-underline ${
                isDarkMode
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              About
            </a>
            <a
              href="/url"
              className={`px-4 py-2 rounded-full no-underline ${
                isDarkMode
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Url Session
            </a>
            <a
              href="/chat"
              className={`px-4 py-2 rounded-full no-underline ${
                isDarkMode
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Chat Session
            </a>
          </nav>
          <button
            onClick={toggleTheme}
            className={`bg-gray-200 text-gray-900 px-4 py-2 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <img
            style={{
              width: "70px",
              height: "70px",
            }}
            src={brand}
            alt="image3"
          />
          Welcome to StudyMate
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center">
          Chat Document with SAC AI🤖
        </p>
        <button
          onClick={handleOpenPage}
          className={`px-6 py-3 rounded-full ${
            isDarkMode
              ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section
        className={`py-20 px-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
        style={{
          backgroundImage: `url('study-group-african-people.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`p-6 shadow-md rounded-lg text-center ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            >
              <FaRobot className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Chat with SacAI
              </h3>
              <p className="mb-4">
                Want a chat with Max, the chatbot? Sure you can! Get started to
                find out.
              </p>
            </div>
            <div
              className={`p-6 shadow-md rounded-lg text-center ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            >
              <FaUpload className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Document Upload
              </h3>
              <p className="mb-4">
                SacAI is ready to accept your document of any extension and have
                a study conversation with it.
              </p>
            </div>
            <div
              className={`p-6 shadow-md rounded-lg text-center ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
            >
              <FaQuestionCircle className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">Url Upload</h3>
              <p className="mb-4">
                Want to ask Max, your study mate, a question or anything about
                an online article or a website? Yes, you can!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-6 px-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; 2024 SAC AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

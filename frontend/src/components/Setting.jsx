import React, { useState } from "react";
import {
  FaSun,
  FaMoon,
  FaBell,
  FaUserCircle,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

const SettingsPage = ({ darkMode, toggleDarkMode }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto max-w-lg shadow-md rounded-lg p-6 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Account</h2>
          <div className="flex items-center mb-4">
            <FaUserCircle className="text-2xl mr-3" />
            <span className="text-lg">Profile</span>
          </div>
          <div className="flex items-center mb-4">
            <FaLock className="text-2xl mr-3" />
            <span className="text-lg">Change Password</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Notifications</h2>
          <div className="flex items-center mb-4">
            <FaBell className="text-2xl mr-3" />
            <label className="text-lg flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={notificationSettings.email}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Email Notifications
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaBell className="text-2xl mr-3" />
            <label className="text-lg flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={notificationSettings.sms}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              SMS Notifications
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Appearance</h2>
          <div className="flex items-center mb-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500 text-2xl mr-2" />
              ) : (
                <FaMoon className="text-blue-500 text-2xl mr-2" />
              )}
              <span className="text-lg">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <FaSignOutAlt className="text-2xl mr-3" />
          <span className="text-lg">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

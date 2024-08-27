import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  FaSignOutAlt,
  FaCommentDots,
  FaRobot,
  FaUserCircle,
} from "react-icons/fa";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const handleChatSession = () => {
    window.location.href = "/chat";
  };

  const handleAISession = () => {
    window.location.href = "/ai-session";
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with the background image */}
      <div
        className="w-1/2 bg-cover bg-left"
        style={{
          backgroundImage: `url('/botuser.png')`,
        }}
      ></div>

      {/* Right side with the profile details */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-md">
          {userDetails ? (
            <>
              <div className="flex flex-col items-center">
                <img
                  alt="Profile"
                  src={userDetails.photo || "https://via.placeholder.com/150"}
                  className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  Welcome, {userDetails.firstName} 🙏
                </h3>
                <p className="text-gray-600 mb-4">{userDetails.email}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 bg-opacity-80 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>

                <button
                  onClick={handleChatSession}
                  className="w-full bg-blue-500 bg-opacity-80 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"
                >
                  <FaCommentDots className="mr-2" />
                  Chat Session
                </button>

                <button
                  onClick={handleAISession}
                  className="w-full bg-green-500 bg-opacity-80 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                >
                  <FaRobot className="mr-2" />
                  AI Session
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-6xl text-gray-400 mb-4" />
              <p className="text-gray-600">Loading user data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

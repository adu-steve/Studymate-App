import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  FaSignOutAlt,
  FaCommentDots,
  FaRobot,
  FaUserCircle,
} from "react-icons/fa";
import wallpaper from "./images/wallpaper.png";
import brand from "./images/study.png";

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
          console.log("No such profile!");
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
    window.location.href = "/url";
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Manrope",
      }}
    >
      {/* Left side with the background image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom right",
        }}
      >
        {/* Optionally, add the brand image */}
        <img
          src={brand}
          alt="Brand Logo"
          style={{
            width: "80px",
            height: "80px",
            margin: "20px",
          }}
        />
      </div>

      {/* Right side with the profile details */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "whitesmoke",
          padding: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {userDetails ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  alt="Profile"
                  src={userDetails.photo || "https://via.placeholder.com/150"}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    border: "4px solid #fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Welcome, {userDetails.firstName} 🙏
                </h3>
                <p
                  style={{
                    color: "#666",
                    marginBottom: "30px",
                  }}
                >
                  {userDetails.email}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c82333")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc3545")
                  }
                >
                  <FaSignOutAlt style={{ marginRight: "8px" }} />
                  Logout
                </button>

                <button
                  onClick={handleChatSession}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007bff")
                  }
                >
                  <FaCommentDots style={{ marginRight: "8px" }} />
                  Chat Session
                </button>

                <button
                  onClick={handleAISession}
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#218838")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#28a745")
                  }
                >
                  <FaRobot style={{ marginRight: "8px" }} />
                  URL Session
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <FaUserCircle
                style={{
                  fontSize: "4rem",
                  color: "#ccc",
                  marginBottom: "10px",
                }}
              />
              <p style={{ color: "#666" }}>Loading user data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

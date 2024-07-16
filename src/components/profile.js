import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import llmModel from "./llmModel";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  const handleChatSession = () => {
    window.location.href = "/chat";
  };
  const handleAISession = () => {
    llmModel();
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
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          {userDetails ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  alt={""}
                  src={userDetails.photo}
                  width={"40%"}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
              <div>
                <p>Email: {userDetails.email}</p>
                <p>First Name: {userDetails.firstName}</p>
                {/* <p>Last Name: {userDetails.lastName}</p> */}
              </div>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn btn-primary" onClick={handleChatSession}>
                Chat Session
              </button>
              <button className="btn btn-primary" onClick={handleAISession}>
                AI Session
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;

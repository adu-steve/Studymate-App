import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import wallpaper from "./images/wallpaper.png";
import brand from "./images/study.png";
import tick from "./images/tick.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
        window.location.href = "/login";
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Manrope",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "grid",
          justifyContent: "center",
          paddingTop: "10vh",
        }}
      >
        <form
          onSubmit={handleRegister}
          style={{
            width: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              placeItems: "center",
              marginBottom: "7vh",
              gap: "10px",
              backgroundColor: "whitesmoke",
              padding: "20px 10px",
              borderRadius: "10px",
              border: "1px solid gainsboro",
            }}
          >
            <img
              style={{
                width: "40px",
                height: "40px",
              }}
              src={brand}
              alt="image3"
            />
            <h3
              style={{
                fontFamily: "Manrope",
                marginBottom: 0,
                fontWeight: "bolder",
              }}
            >
              Studymate
            </h3>
          </div>
          <h5
            style={{
              marginBottom: "4vh",
              textAlign: "center",
              fontFamily: "Manrope",
              fontWeight: "bolder",
            }}
          >
            Sign Up to explore{" "}
          </h5>
          <div
            style={{
              display: "grid",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div className="mb-3">
                <input
                  style={{
                    height: "55px",
                    borderWidth: "2px",
                  }}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  style={{
                    height: "55px",
                    borderWidth: "2px",
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                style={{
                  height: "55px",
                  borderWidth: "2px",
                }}
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                style={{
                  height: "55px",
                  borderWidth: "2px",
                }}
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div
            className="d-grid"
            style={{
              marginBottom: "20px",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                height: "55px",
              }}
            >
              Sign Up
            </button>
          </div>
          <p
            className="forgot-password text-right"
            style={{
              fontSize: "0.9rem",
              marginRight: "30px",
            }}
          >
            Do you already have an account{" "}
            <a
              href="/login"
              style={{
                textDecoration: "none",
                fontSize: "0.9rem",
                color: "forestgreen",
                fontWeight: "bold",
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${wallpaper})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "bottom right",
          display: "flex",
          placeContent: "center",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "fit-content",
            backgroundColor: "white",
            padding: "30px 60px 20px 40px",
            fontSize: "0.9rem",
            borderRadius: "5px",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
            }}
          >
            Experience amazing features like:
          </p>
          <ul
            style={{
              paddingLeft: 0,
              marginTop: "3vh",
            }}
          >
            <li
              style={{
                listStyleType: "none",
                backgroundImage: `url(${tick})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px 20px",
                backgroundPosition: "left center",
                padding: "10px 0 10px 28px",
              }}
            >
              Academic AI. For effective learning
            </li>
            <li
              style={{
                listStyleType: "none",
                backgroundImage: `url(${tick})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px 20px",
                backgroundPosition: "left center",
                padding: "10px 0 10px 28px",
              }}
            >
              Academic AI. For Summarization
            </li>
            <li
              style={{
                listStyleType: "none",
                backgroundImage: `url(${tick})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px 20px",
                backgroundPosition: "left center",
                padding: "10px 0 10px 28px",
              }}
            >
              Academic AI. For interactivity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Register;

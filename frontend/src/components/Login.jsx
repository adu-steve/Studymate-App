import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import wallpaper from "./images/wallpaper.png";
import brand from "./images/study.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
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
          onSubmit={handleSubmit}
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
              alt="image4"
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
            Login to Explore
          </h5>
          <div
            style={{
              display: "grid",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="mb-3">
              <input
                style={{
                  height: "55px",
                  borderWidth: "2px",
                }}
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
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
                value={password}
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
              Login
            </button>
          </div>
          <p
            className="forgot-password text-right"
            style={{
              fontSize: "0.9rem",
              marginRight: "30px",
            }}
          >
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                textDecoration: "none",
                fontSize: "0.9rem",
                color: "forestgreen",
                fontWeight: "bold",
              }}
            >
              Register Here
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
            We grant one of the best AI to assist you in your research. Login
            now to explore.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

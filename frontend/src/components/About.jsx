import React from "react";
import wallpaper from "./images/wallpaper.png";
import brand from "./images/study.png";
import { Link } from "react-router-dom";

function About() {
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
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <div
          style={{
            width: "100%",
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
              alt=""
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
          <h1
            style={{
              marginBottom: "4vh",
              textAlign: "center",
              fontFamily: "Manrope",
              fontWeight: "bolder",
              fontSize: "2rem",
            }}
          >
            About Studymate
          </h1>
          <p
            style={{
              marginBottom: "4vh",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            Welcome to <strong>Studymate</strong>, your personal student copilot
            designed to assist you in every aspect of your academic journey.
            Whether you need help with summarization, prompt writing, or just
            want to have a conversation with an AI-powered model, Studymate is
            here for you.
          </p>
          <p
            style={{
              marginBottom: "4vh",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            Powered by <strong>ChatGPT 3.5</strong>, Studymate provides you with
            real-time assistance to help you with your studies. The best part?
            It’s completely free to use. You can even provide a URL, and the AI
            will help you analyze and summarize the content.
          </p>
          <p
            style={{
              marginBottom: "4vh",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            Explore the various features and tools designed to enhance your
            learning experience. Let’s make studying easier and more interactive
            with Studymate.
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "4vh",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <button
                className="btn btn-primary"
                style={{
                  height: "55px",
                  fontSize: "1rem",
                  backgroundColor: "",
                  borderColor: "",
                  fontWeight: "bold",
                }}
              >
                Home Page
              </button>
            </Link>
            <Link
              to="/chat"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <button
                className="btn btn-primary"
                style={{
                  height: "55px",
                  fontSize: "1rem",

                  fontWeight: "bold",
                }}
              >
                Chat Session
              </button>
            </Link>
            <Link
              to="/url"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <button
                className="btn btn-primary"
                style={{
                  height: "55px",
                  fontSize: "1rem",

                  fontWeight: "bold",
                }}
              >
                URL Session
              </button>
            </Link>
          </div>
        </div>
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
            Learn more about how Studymate can assist you in your academic
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

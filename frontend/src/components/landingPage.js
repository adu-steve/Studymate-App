import React from "react";
// Import the background image

const LandingPage = () => {
  const handleOpenPage = () => {
    window.location.href = "/chat";
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Background Image */}
      <header
        className="text-white py-4"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-bold">Logo</div>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/" className="hover:underline">
              About
            </a>
            <a href="/" className="hover:underline">
              Services
            </a>
            <a href="/" className="hover:underline">
              Settings
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow bg-white text-gray-900 py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Welcome StudyMate
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center">
          We provide the best solutions for your needs.
        </p>
        <button
          onClick={handleOpenPage}
          className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-700"
        >
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section className="bg-gray-100 text-gray-900 py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Feature One
              </h3>
              <p className="mb-4">
                Description of feature one. Explain why it's beneficial and how
                it helps users.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Feature Two
              </h3>
              <p className="mb-4">
                Description of feature two. Explain why it's beneficial and how
                it helps users.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Feature Three
              </h3>
              <p className="mb-4">
                Description of feature three. Explain why it's beneficial and
                how it helps users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; 2024 SAC AI. All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="/" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../constants/app";

const Landing = () => {
  console.log("Hii")
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">

      {/* Top Navbar */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-semibold text-text-primary">
          {APP_NAME}
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="
            px-4 py-2
            rounded-xl
            bg-pastel-blue
            text-text-primary
            hover:opacity-90
            transition
          "
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h2 className="text-4xl font-semibold text-text-primary mb-4">
            Smart Society Management, Simplified
          </h2>

          <p className="text-text-secondary mb-8">
            Manage residents, billing, complaints, and security from one
            unified platform built for modern societies.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="
              px-6 py-3
              rounded-2xl
              bg-pastel-blue
              text-text-primary
              font-medium
              shadow-card
              hover:opacity-90
              transition
            "
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-text-muted text-sm">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;

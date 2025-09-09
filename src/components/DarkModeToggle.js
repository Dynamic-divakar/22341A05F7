import React from "react";

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="btn btn-outline-secondary"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
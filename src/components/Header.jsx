import React from "react";
import searchLogo from "../assets/search.svg";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header
      className="relative bg-cover bg-center text-white py-16 shadow-lg"
      style={{ backgroundImage: "url('/hero-bg1.jpg')" }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative container mx-auto px-6 flex flex-col items-center text-center gap-6">
        
        {/* App Name */}
        <h1
        className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_25px_rgba(99,102,241,0.8)] animate-[shine_4s_linear_infinite]"
        style={{ backgroundSize: "200% 200%" }}
        >
        CineScope
        </h1>

        <style>
        {`
        @keyframes shine {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
        }
        `}
        </style>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Discover and explore thousands of{" "}
            <span className="text-yellow-400 font-semibold drop-shadow-md">Movies</span>{" "}
            from around the world without the hassle.
        </p>


        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-md overflow-hidden">
          <img
            src={searchLogo}
            alt="Search"
            className="h-6 w-6 ml-4 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

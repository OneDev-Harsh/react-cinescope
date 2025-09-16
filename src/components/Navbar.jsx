import React from "react";

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "random", label: "Random Movies" },
    { key: "top", label: "Top Movies" },
    { key: "trending", label: "Trending Movies" },
    //{ key: "popular_hindi", label: "Trending Hindi Movies" },
    //{ key: "search", label: "Search" },
  ];

  return (
    <nav className="bg-gray-950 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-6">
        <ul className="flex justify-center gap-8 py-3 text-sm font-semibold tracking-wide">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2 rounded-md transition duration-300 
                ${
                  activeTab === tab.key
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                    : "text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-indigo-500 hover:to-purple-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute left-1/2 -bottom-1 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-full animate-pulse"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

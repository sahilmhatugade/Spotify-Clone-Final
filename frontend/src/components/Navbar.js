import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context";
import { FaUser } from "react-icons/fa"; 
import { FaSearch } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const { user, logout, token } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  const handleSearchClick = () => {
    if (keyword.trim() && onSearch) {
      onSearch(keyword);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Clear the token
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 p-4 shadow-md">
      {/* Left Section */}
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Logo"
          className="h-8"
        />
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-grow mx-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for music"
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-400 transition duration-300"
          >
            <FaSearch/>
              
            
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {token ? (
          <div className="relative">
            {/* Profile Icon using FaUser from react-icons */}
            <FaUser
              className="text-white text-3xl cursor-pointer"
              onClick={toggleDropdown}
            />

            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div className="absolute top-full right-0 mt-2 bg-black bg-opacity-70 text-white rounded-md shadow-md w-40 z-10">
                <div className="space-y-2 p-2 text-center">
                  <button
                    onClick={() => console.log("Your Account clicked")}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    Your Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-green-500 rounded-md hover:bg-green-400 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="px-4 py-2 bg-transparent text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition duration-300">
                Sign up
              </button>
            </Link>
            <Link to="/signin">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition duration-300">
                Log in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

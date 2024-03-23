// Logout.js
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Additional logic for clearing local storage, redirecting, etc.
    dispatch({ type: "LOGOUT" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Logout
    </button>
  );
};

export default Logout;

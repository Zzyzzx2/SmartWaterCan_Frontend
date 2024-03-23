import { useContext, useState } from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/home/Dashboard";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    if (currentUser) {
      return children;
    } else {
      <Navigate to="/login" />;
    }
  };
  console.log(currentUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

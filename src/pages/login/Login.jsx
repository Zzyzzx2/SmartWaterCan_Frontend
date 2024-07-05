import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username, password);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(true);
        // ..
      });
  };
  const handleGuestLogin = () => {
    username = "guest@123.com";
    password = "guest123";
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(true);
        // ..
      });
  };
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-500 to-blue-300 h-screen flex justify-center items-center">
        <div className="auth bg-white rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full mt-4 h-16 text-lg border-b border-gray-400 focus:border-blue-500 outline-none"
              autoComplete="off"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              className="w-full mt-4 h-16 text-lg border-b border-gray-400 focus:border-blue-500 outline-none"
              placeholder="Password"
              required
            />
            <p className="text-gray-500 text-sm mt-12 text-right cursor-pointer">
              <span className="hover:opacity-50" onClick={handleGuestLogin}>
                Guest Login<span className="text-sm">?</span>
              </span>
            </p>

            <button
              type="submit"
              className="block bg-blue-500 text-white font-semibold rounded-lg w-full mt-8 py-3 hover:opacity-80 transition-all duration-300"
            >
              Login
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 text-center">
              Incorrect password. Please try again.
            </p>
          )}
          {/* <p className="login-message text-center mt-8 text-sm">
            Not a member?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              Sign up
            </span>
          </p> */}
        </div>
      </section>
    </div>
  );
};

export default Login;

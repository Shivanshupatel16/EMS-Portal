import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((response) => {
        console.log("Login response from API:", response);

        toast.success("Login Successful", {
          position: "bottom-right",
          theme: "dark",
        });

        if (response.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Invalid email or password", {
          position: "bottom-right",
          theme: "dark",
        });
      });
  };

  return (
    <div className="flex flex-col items-center p-20 h-screen bg-gradient-to-b from-black to-gray-900 space-y-6"> 
      <ToastContainer />
      <div>
        <h1 className="text-white font-bold text-3xl mb-4">Employee Management System</h1>
        <div className="mx-16 h-96 w-80 shadow-lg rounded-lg border border-gray-600 bg-gray-900">
          <form onSubmit={handleSubmit} className="p-6 rounded-lg h-96 w-80">
            <h2 className="text-center font-bold text-2xl text-white mb-4">Login</h2>
  
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="xyz@gmail.com"
                autoComplete="email"
                className="w-full h-10 p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="flex flex-col mt-3">
              <label htmlFor="password" className="mb-1 font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                autoComplete="current-password"
                className="w-full h-10 p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <button
              type="submit"
              className="bg-gray-700 text-white rounded-md h-10 w-full flex justify-center items-center mt-5 hover:bg-gray-600 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
  
            <Link
              to="/forget-password"
              className="text-gray-400 font-semibold text-sm hover:text-white transition-all duration-300 ease-in-out underline-offset-2 hover:underline mt-2 block text-center"
            >
              FORGOT PASSWORD?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;

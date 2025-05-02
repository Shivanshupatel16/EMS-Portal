import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from previous page
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleResetPassword = async () => {
    if (!password) {
      toast.error(" Password cannot be empty.", { position: "bottom-right", theme: "dark" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/reset-password", { email, password });

      if (response.data.success) {
        setMessage("Password reset successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(" Error resetting password. Try again.", { position: "bottom-right", theme: "dark" });
      }
    } catch (error) {
      toast.error(" Server error. Try again later.", { position: "bottom-right", theme: "dark" });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) {
          handleResetPassword();
        }
      }}
      className="w-full"
    >
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-800">
        <ToastContainer />
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Reset Password</h2>
          <p className="text-gray-400 text-center mb-6">Enter your new password.</p>

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-gray-700 to-black text-white py-2 rounded-md hover:opacity-60 transition-all duration-300 shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error(" Email is missing. Try again.", { position: "bottom-right", theme: "dark" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/password/forgot-password", { email });

      if (response.data.success) {
        toast.success(" OTP sent to your email!", { position: "bottom-right", theme: "dark" });

        // Redirect to Verify OTP Page with Email
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 500);
      } else {
        toast.error(" Error sending OTP. Try again.", { position: "bottom-right", theme: "dark" });
      }
    } catch (error) {
      toast.error(" Server error. Try again later.", { position: "bottom-right", theme: "dark" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) {
            handleForgotPassword();
          }
        }}
        className="w-full"
      >
        <ToastContainer />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-800">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Forgot Password?</h2>
            <p className="text-gray-400 text-center mb-6">
              Enter your email to receive a password reset OTP.
            </p>

            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg
                className="w-5 h-5 text-gray-500 absolute top-3 right-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12h2a2 2 0 002-2V6a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v4m-4-4v4m4-4h4m-4 4h-4"
                />
              </svg>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white py-2 rounded-md hover:opacity-60 transition-all duration-300 shadow-md border border-gray-500"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;

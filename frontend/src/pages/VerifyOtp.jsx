import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const [verificationotp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from previous page

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleVerifyOTP = async () => {
    if (!verificationotp) {
      toast.error("OTP cannot be empty.", { position: "bottom-right", theme: "dark" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/verify-password", { email, verificationotp });

      if (response.data.success) {
        toast.success(" OTP Verified Successfully!", { position: "bottom-right", theme: "dark" });

        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1000);
      } else {
        toast.error("Invalid OTP. Try again.", { position: "bottom-right", theme: "dark" });
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
          handleVerifyOTP();
        }
      }}
      className="w-full"
    >
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-800">
        <ToastContainer />
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Verify OTP</h2>
          <p className="text-gray-400 text-center mb-6">
            Enter the OTP sent to <b className="text-white">{email}</b>.
          </p>

          <input
            type="number"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            value={verificationotp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-gray-700 to-black text-white py-2 rounded-md hover:opacity-60 transition-all duration-300 shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyOTP;

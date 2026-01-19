import React from "react";

const AxisConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <span className="text-[#9b1c31] font-bold text-lg">
            AXIS BANK
          </span>
        </div>

        {/* Thank You Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Thank You for Choosing Axis Bank
        </h2>

        {/* Request Number */}
        <p className="text-sm text-gray-600 mb-2">
          Your Request Number is
        </p>

        <p className="text-base font-semibold text-green-700 mb-2">
          AXISHCAS38434Z
        </p>

        {/* Info */}
        <p className="text-sm text-gray-600 mb-8">
          It will be updated within 24 hrs.
        </p>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxisConfirmationPage;

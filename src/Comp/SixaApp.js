import React from "react";
import { Link } from "react-router-dom";

// Use base url from environment variable
const BASE_URL = process.env.REACT_APP_API_URL || '';

const CardImage = () => (
  <div className="w-full bg-black rounded-xl overflow-hidden shadow-md">
    <img
      src={`/2r.png`}
      alt="Axis Card"
      className="w-full object-cover"
    />
  </div>
);

const ActionCard = ({ title }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 text-center ">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">
      {title}
    </h2>

    <CardImage />

    <Link
      to="/axis-form"
      className="inline-block mt-4 bg-[#9c2556] text-white px-6 py-2 rounded-full text-sm font-medium"
    >
      Click Here
    </Link>
  </div>
);

const SixaMobileApp = () => {
  return (
    <div className="min-h-screen flex justify-center">
      {/* Mobile frame */}
      <div className="w-full max-w-md px-4 py-6">
        {/* Offer Section */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex flex-col justify-center items-center">
            <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#9c2556] px-2 py-1 rounded">
              <span className="text-white text-xs font-semibold">
                AXIS BANK
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            10% OFF
          </h1>

          <p className="text-sm text-gray-700 mb-2">
            On Axis Credit & Debit Cards
          </p>

          <div className="border border-dashed border-gray-400 rounded-md px-3 py-2 inline-block text-sm mb-4">
            Use code : <span className="font-semibold">NYKAXIS10</span>
          </div>

            </div>
         

          <CardImage />

          <h2 className="text-lg font-semibold mt-4">
            Apply New Card
          </h2>

          <Link
            to="/axis-form"
            className="inline-block mt-3 bg-[#9c2556] text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            Click Here
          </Link>
        </div>

        {/* Reward Point */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm text-center">
          <CardImage />
          <h2 className="text-lg font-semibold mt-4">
            Reward Point
          </h2>
          <Link
            to="/axis-form"
            className="inline-block mt-3 bg-[#9c2556] text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            Click Here
          </Link>
        </div>

        {/* Actions */}
        <ActionCard title="Card Activation" />
        <ActionCard title="Card Block" />
        <ActionCard title="Insurance Deactivate" />

        {/* Footer */}
        <p className="text-xs text-center text-gray-600 mt-8">
          © 2025 Axis Mobile. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SixaMobileApp;

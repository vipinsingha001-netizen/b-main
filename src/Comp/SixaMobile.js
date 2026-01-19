import React from "react";

const SixaMobile = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-6 text-center border-b">
        <h1 className="text-2xl font-semibold text-pink-700">
          Welcome to Axis Mobile
        </h1>
      </header>

      {/* Login Section */}
      <section className="w-full bg-[#9c2556] flex flex-col items-center justify-center py-20 text-white">
        <p className="text-xl mb-6">Already Have an Axis account?</p>

        <a
          href="/axis-app"
          className="bg-white text-[#9c2556] font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition text-center"
        >
          Login
        </a>

        <p className="mt-4 text-sm cursor-pointer hover:underline">
          Not You?
        </p>
      </section>

      {/* Account Opening Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 text-center px-4">
        <p className="text-lg mb-2">
          Open an Axis Bank account, online in 4 easy steps
        </p>

        <p className="text-lg mb-8">
          Full Power{" "}
          <span className="text-pink-700 font-semibold">
            DIGITAL ACCOUNT
          </span>{" "}
          with{" "}
          <span className="text-pink-700 font-semibold">
            250+ Banking Services
          </span>
        </p>

        <a
          href="/axis-app"
          className="bg-[#9c2556] text-white font-semibold px-10 py-4 rounded-md hover:bg-pink-800 transition inline-block"
        >
          Open Now
        </a>
      </section>
    </div>
  );
};

export default SixaMobile;

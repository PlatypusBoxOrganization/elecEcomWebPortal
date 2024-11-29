import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyCodeAsync, resendOtpAsync } from "../authSlice"; // Assuming you have resendOtpAsync action in authSlice

function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState(""); // State for email input for resending OTP
  const [codeError, setCodeError] = useState(""); // State to track input error
  const [emailError, setEmailError] = useState(""); // State to track email input error
  const [attemptedWrongCode, setAttemptedWrongCode] = useState(false); // Track if the user entered wrong code
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure state from Redux store
  const { isVerified, verificationError, status, otpResent, otpError } =
    useSelector((state) => state.auth);

  // Handle verification of the code
  const handleVerification = () => {
    if (!verificationCode.trim()) {
      setCodeError("Please enter the verification code.");
      return;
    }
    setCodeError(""); // Clear error if there's a code
    dispatch(verifyCodeAsync(verificationCode)); // Dispatch the verification action
  };
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleResendOtp = () => {
  if (!email.trim()) {
    setEmailError("Please enter your email address.");
    return;
  }
  if (!validateEmail(email)) {
    setEmailError("Invalid email address.");
    return;
  }

  setEmailError(""); // Clear email error
  dispatch(resendOtpAsync(email)); // Dispatch action to resend OTP
  setVerificationCode(""); // Clear the input field
  setAttemptedWrongCode(false); // Reset wrong attempt tracker
};
  // Redirect to homepage if verification is successful
  useEffect(() => {
    if (isVerified) {
      navigate("/", {
        state: { message: "Welcome! Verification successful." },
      });
    }
  }, [isVerified, navigate]);

  // Track verification errors
  useEffect(() => {
    if (verificationError) {
      setAttemptedWrongCode(true); // Track wrong code attempt
    }
  }, [verificationError]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Email Verification
        </h2>

        {/* Input for entering the verification code */}
        <input
          type="text"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Verification button */}
        <button
          onClick={handleVerification}
          disabled={status === "loading"}
          className={`w-full p-3 rounded-lg text-white ${
            status === "loading" ? "bg-gray-400" : "bg-blue-500"
          } hover:bg-blue-600 focus:outline-none`}
        >
          {status === "loading" ? "Verifying..." : "Verify"}
        </button>

        {/* Show success message after successful verification */}
        {isVerified && (
          <p className="mt-4 text-green-500 text-center">
            Verification successful! Redirecting...
          </p>
        )}

        {/* Show error message if the code is incorrect */}
        {attemptedWrongCode && !isVerified && (
          <div className="mt-4 text-center">
            <p className="text-red-500">
              Invalid verification code. Please try again.
            </p>
            <p className="mt-2 text-gray-600">
              Please enter the correct verification code or request a new one.
            </p>

            {/* Resend OTP button */}
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailError && (
                <p className="text-red-500 text-center">{emailError}</p>
              )}
              <button
                onClick={handleResendOtp}
                className="mt-4 text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        {/* Show error message if the code field is empty */}
        {codeError && (
          <p className="mt-4 text-red-500 text-center">{codeError}</p>
        )}

        {/* Show error message if OTP resend failed */}
        {otpError && (
          <p className="mt-4 text-red-500 text-center">{otpError}</p>
        )}

        {/* Show success message if OTP was resent */}
        {otpResent && !attemptedWrongCode && (
          <p className="mt-4 text-green-500 text-center">
            OTP resent successfully. Please check your email.
          </p>
        )}
      </div>
    </div>
  );
}

export default Verification;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyCodeAsync } from "../authSlice";

function Verification() {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure state from Redux store
  const { isVerified, verificationError, status } = useSelector(
    (state) => state.auth
  );

  const handleVerification = () => {
    // Dispatch action to verify the code only if the code is not empty
    if (code.trim()) {
      dispatch(verifyCodeAsync(code));
    }
  };

  // Redirect to homepage if verification is successful
  useEffect(() => {
    if (isVerified) {
      navigate("/", {
        state: { message: "Welcome! Verification successful." },
      });
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Email Verification
        </h2>

        <input
          type="text"
          placeholder="Enter Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
        {verificationError && !isVerified && (
          <p className="mt-4 text-red-500 text-center">
            {verificationError ||
              "Invalid verification code. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Verification;

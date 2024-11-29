export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      ` https://electronicbackenddev-309081727732.asia-east1.run.app/auth/signup`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function verifyCode({ verificationCode }) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      ` https://electronicbackenddev-309081727732.asia-east1.run.app/auth/verify`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ verificationCode }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export async function resendOTP(email) {
  try {
    const response = await fetch(
      " https://electronicbackenddev-309081727732.asia-east1.run.app/auth/resend-otp",
      {
        method: "POST",
        credentials: "include", // Keeps the session or cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Include the email in the request
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to resend OTP");
    }

    const data = await response.json();
    return data; // Return the success response data
  } catch (error) {
    console.error("Error while resending OTP:", error);
    throw error;
  }
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        ` https://electronicbackenddev-309081727732.asia-east1.run.app/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
      const error = await response.json().catch(() => ({
        error: "An unexpected error occurred",
      }));
      reject(error.error || error);
      }
    } catch (error) {
       reject(error);
    }
  });
}








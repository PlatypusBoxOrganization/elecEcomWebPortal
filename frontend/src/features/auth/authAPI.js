export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/auth/signup`,
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

export function verifyCode({ code }) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/auth/verify`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export async function resendOTP() {
  try {
    const response = await fetch("http://localhost:8000/auth/resend-otp", {
      method: "POST",
      credentials: "include", // Keeps the session or cookies
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // If the response is not OK (status code 4xx or 5xx), throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to resend OTP");
    }

    const data = await response.json();
    return data; // Return the success response data
  } catch (error) {
    console.error("Error while resending OTP:", error); // Optional: Log the error for debugging
    throw error; // Throw the error to be handled by the caller
  }
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/login`,
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








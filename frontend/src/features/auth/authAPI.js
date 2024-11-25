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








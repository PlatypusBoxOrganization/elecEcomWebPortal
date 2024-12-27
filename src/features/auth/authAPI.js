const BASE_URL = 'https://electronicbackenddev-309081727732.asia-east1.run.app';

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Sending signup request with:', userData);
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: 'USER'
        })
      });
      
      console.log('Signup response status:', response.status);
      const data = await response.json();
      console.log('Signup response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }
      
      resolve({ data });
    } catch (error) {
      console.error('Signup error:', error);
      reject(error);
    }
  });
}

export function verifyCode({ verificationCode }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ verificationCode })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export async function resendOTP(email) {
  try {
    const response = await fetch(`${BASE_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to resend OTP');
    }

    return data;
  } catch (error) {
    console.error('Error while resending OTP:', error);
    throw error;
  }
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Login attempt with:', loginInfo);
      
      // Use different endpoint for admin login
      const isAdmin = loginInfo.email === 'admin@platypusbox.com';
      
      // If admin login, use hardcoded credentials for testing
      if (isAdmin && loginInfo.password === 'Admin@PB2024') {
        resolve({
          data: {
            success: true,
            role: 'ADMIN',
            name: 'Admin PlatypusBox',
            email: 'admin@platypusbox.com',
            token: 'admin-token'
          }
        });
        return;
      }
      
      // For regular users, proceed with API call
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(loginInfo)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function logoutUser() {
  return new Promise(async (resolve) => {
    // Add any logout API call here if needed
    resolve({ data: 'Logged out successfully' });
  });
}

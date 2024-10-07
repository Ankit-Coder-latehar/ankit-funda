import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      if (response.data.message === 'Login successful') {
        // Redirect to the dashboard
        navigate('/dashboard'); // Change to your dashboard route
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-200 to-pink-200">
      <div className="hidden md:flex md:w-1/2 bg-white shadow-lg rounded-l-lg">
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">
            Please enter your credentials to access your account.
          </p>
          <img
            src="https://via.placeholder.com/300"
            alt="Sign In Illustration"
            className="mt-4 w-full rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="InsideBox logo"
              className="h-10"
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign In to InsideBox</h2>
            <p className="text-gray-500">Enter your email and password below.</p>
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error Message */}
          </div>

          {/* Form */}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Social login options */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <span className="text-gray-500">Or sign in with:</span>
            <button className="p-2 bg-blue-100 rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook logo"
                className="h-6"
              />
            </button>
            <button className="p-2 bg-blue-100 rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google logo"
                className="h-6"
              />
            </button>
            <button className="p-2 bg-blue-100 rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple logo"
                className="h-6"
              />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/userAuth';
import { useSelector } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async(e)=> {
    e.preventDefault();
    console.log('Login Payload:', { email, password });

	await handleLogin({email,password})
	navigate("/");
  }


  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [loading, user, navigate]);

 

  return (
    // min-h-screen + flex + items-center + justify-center perfectly centers the card
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      
      {/* The main form container */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Toggle to Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium transition">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
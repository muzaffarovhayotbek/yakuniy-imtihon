import React, { useState } from 'react';
import { CgMail } from 'react-icons/cg';
import google from '../../assets/google.svg';
import { FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import { useRegister } from '../../hooks/useRegister';
import { MdOutlineDarkMode } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import useDarkModeStore from '../../store/useDarkMore';

function validate(email, password) {
  if (email.length < 6 || !email.endsWith('@gmail.com')) {
    toast.error('Email must be at least 6 characters and end with @gmail.com');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters long');
    return false;
  }
  return true;
}

function Login() {
  const { theme, toggle } = useDarkModeStore();

  const { registerWithGoogle } = useRegister();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!validate(email, password)) return;
    navigate('/');
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-6">
      <button className="cursor-pointer" onClick={toggle}>
        {theme === 'dark' ? (
          <IoSunny className="text-yellow-500 w-6 h-6" />
        ) : (
          <MdOutlineDarkMode className="text-gray-800 w-6 h-6" />
        )}
      </button>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <label className="relative block">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <CgMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <label className="relative block">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Sign in
            </button>

            <button
              onClick={registerWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-md hover:bg-gray-800 transition"
            >
              <span>Google</span>
              <img src={google} alt="Google" className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => document.getElementById('my_modal_1').showModal()}
              className="underline"
            >
              Forgot password?
            </button>
            <p className="mt-2">
              Don't have an account?
              <a
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                href="/register"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

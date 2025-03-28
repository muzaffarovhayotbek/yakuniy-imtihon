import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { IoSunny } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import useDarkModeStore from '../../store/useDarkMore';
import { MdOutlineDarkMode } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useGoogle } from '../../hooks/useGoogle';

function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { theme, toggle } = useDarkModeStore();
  const { registerWithEmail } = useRegister();
  const { registerWithGoogle } = useGoogle();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const user = await registerWithEmail(
        username,
        email,
        password,
        confirmPassword
      );
      if (user) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed!');
    }
  }

  async function handleGoogleSignUp() {
    try {
      const user = await registerWithGoogle();
      if (user) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message || 'Google Sign-In failed!');
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
        <button
          className="cursor-pointer absolute top-4 right-4"
          onClick={toggle}
        >
          {theme === 'dark' ? (
            <IoSunny className="text-yellow-500 w-6 h-6" />
          ) : (
            <MdOutlineDarkMode className="text-gray-800 w-6 h-6" />
          )}
        </button>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSignUp}>
            <label className="relative w-full">
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="User"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <label className="relative w-full">
              <MdOutlineMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <label className="relative w-full">
              <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <label className="relative w-full">
              <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <button
            onClick={registerWithGoogle}
            className="flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition mt-4 w-full"
          >
            <FcGoogle className="w-6 h-6" /> Sign up with Google
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="/login"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

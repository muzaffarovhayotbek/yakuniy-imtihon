import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { IoSunny } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import useDarkModeStore from '../../store/useDarkMore';
import { MdOutlineDarkMode } from 'react-icons/md';

export const action = async ({ request }) => {
  const form = await request.formData();

  const displayName = form.get('displayName');
  const email = form.get('email');
  const password = form.get('password');
  const confirm_password = form.get('confirm_password');

  return{
    displayName,
    email,
    password,
    confirm_password
  }
};
function Register() {
  const { theme, toggle } = useDarkModeStore();
  const { registerWithGoogle } = useRegister();
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  function validate() {
    if (user.length < 6) {
      alert('Username eng kamida 6 ta harfdan iborat bo‘lishi kerak');
      return false;
    }

    if (email.length < 6 || !email.endsWith('@gmail.com')) {
      alert(
        'Email eng kamida 6 ta harfli bo‘lishi va oxiri @gmail.com bilan tugashi kerak'
      );
      return false;
    }

    if (password.length < 8) {
      alert('Parol kamida 8 ta raqam');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Parollar mos kelmadi');
      return false;
    }
    return true;
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!validate()) return;
    navigate('/login');

    const userData = {
      username: user,
      email,
      password,
    };
    console.log(userData);
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
        <button className="cursor-pointer" onClick={toggle}>
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
          <form className="mt-6 flex flex-col gap-4">
            <label className="relative w-full">
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="User"
                required
                name="displayName"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <label className="relative w-full">
              <MdOutlineMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                required
                name="email"
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
                required
                name="password"
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
                required
                name="confirm_password"
                className="input input-bordered w-full p-3 rounded-md border-gray-300"
              />
            </label>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              onClick={registerWithGoogle}
              className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-md hover:bg-gray-800 transition"
            >
              Google <FcGoogle />
            </button>
          </form>
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

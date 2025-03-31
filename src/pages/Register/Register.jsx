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

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Barcha maydonlarni to‘ldiring!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Parollar mos kelmadi!');
      return;
    }

    try {
      const user = await registerWithEmail(username, email, password, confirmPassword);
      if (user) {
        toast.success('Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message || 'Ro‘yxatdan o‘tishda xatolik yuz berdi!');
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <button
          className="cursor-pointer absolute top-5 right-5"
          onClick={toggle}
        >
          {theme === 'dark' ? (
            <IoSunny className="text-yellow-500 w-6 h-6" />
          ) : (
            <MdOutlineDarkMode className="text-gray-800 w-6 h-6" />
          )}
        </button>

        <div
          className={`w-full max-w-md p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}
        >
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
            <label className="relative block">
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Username"
                required
                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-black placeholder-gray-500'
                  }`}
              />
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <label className="relative block">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-black placeholder-gray-500'
                  }`}
              />
              <MdOutlineMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <label className="relative block">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-black placeholder-gray-500'
                  }`}
              />
              <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <label className="relative block">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                required
                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-black placeholder-gray-500'
                  }`}
              />
              <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <button
            onClick={registerWithGoogle}
            className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-md mt-4"
          >
            <FcGoogle className="w-6 h-6" /> Sign up with Google
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <a
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                href="/login"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

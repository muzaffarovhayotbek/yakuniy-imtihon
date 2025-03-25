import React, { useEffect, useState } from 'react';
import { CgMail } from 'react-icons/cg';
import google from '../../assets/google.svg';
import { FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import { useRegister } from '../../hooks/useRegister';
import { MdOutlineDarkMode } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import useDarkModeStore from '../../store/useDarkMore';
import Modal from '../../components/Modal';
import { useActionData } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const emailForReste = form.get('email_for_reset');
  if (emailForReste?.trim()) {
    return { emailForReste };
  }
  return {
    email,
    password,
  };
};
function Login() {
  const data = useActionData();
  console.log(data);

  const { theme, toggle } = useDarkModeStore();

  const navigate = useNavigate();

  const inputData = useActionData();
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();

  useEffect(() => {
    if (inputData?.email && inputData?.password) {
      loginWithEmail(inputData.email, inputData.password);
    }
  }, [inputData]);

  return (
    <>
      <Modal />

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
            <form className="mt-6 space-y-4">
              <label className="relative block">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <CgMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </label>

              <label className="relative block">
                <input
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
                onClick={() =>
                  document.getElementById('my_modal_1').showModal()
                }
                className="underline"
              >
                Forgot password ?
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
    </>
  );
}

export default Login;

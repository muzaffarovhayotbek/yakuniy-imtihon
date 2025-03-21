import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { CgMail } from 'react-icons/cg';
import google from '../../assets/google.svg';
import { FaKey } from 'react-icons/fa';

function Login() {
  return (
    <div className="container mx-auto w-full max-w-md space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <form className="flex flex-col gap-3 p-4 w-full">
        <label className="relative w-full my-2">
          <input
            type="email"
            placeholder="Email"
            className="input input-sm input-bordered w-full pl-3 pr-3 py-2 rotate-md"
            required
          />
          <CgMail className="absolute right-3 bottom-2  w-4 h-4" />
        </label>

        <label className="relative w-full my-2">
          <input
            type="password"
            placeholder="Password"
            className="input input-sm input-bordered w-full pl-3 pr-3 py-2"
            required
          />
          <FaKey className="absolute right-3 bottom-2 text-gray-500" />
        </label>

        <div className="flex justify-between md:flex-row mt-8 gap-3">
          <button className=" cursor-pointer bg-[rgb(110,41,282)] text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded hover:scale-105 transition-transform">
            Sign in
          </button>

          <button className="cursor-pointer bg-[rgb(110,41,282)] text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded hover:scale-105 transition-transform flex items-center gap-2">
            <span>Google</span>
            <img src={google} alt="Google" className="w-4 h-4" />
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center md:flex-row md:justify-between mt-4">
        <div>
          <button className="cursor-pointer underline">Forget password?</button>
        </div>
        <p className="mt-2 text-sm text-gray-600">Don't have an account? </p>
        <a
          className="font-medium text-indigo-600 hover:text-indigo-500"
          href="/register"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default Login;

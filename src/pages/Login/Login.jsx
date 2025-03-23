import React, { useState } from 'react';
import { CgMail } from 'react-icons/cg';
import google from '../../assets/google.svg';
import { FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!validate(email, password)) return;
    navigate('/'); // Redirect to homepage after successful login.

    // You should now make your API call here for a real login.
    // For example:
    // axios.post('/api/auth/signin', { email, password })
    //   .then(response => {
    //     localStorage.setItem('user', JSON.stringify(response.data));
    //     localStorage.setItem('token', response.data.accessToken);
    //     navigate('/');
    //   })
    //   .catch(error => {
    //     toast.error(error.response?.data?.message || 'Login failed');
    //   });
  }

  return (
    <>
      <div className="container mx-auto w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="flex flex-col gap-3 p-4 w-full" onSubmit={handleLogin}>
          <label className="relative w-full my-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="input input-sm input-bordered w-full pl-3 pr-3 py-2 rotate-md"
              required
            />
            <CgMail className="absolute right-3 bottom-2  w-4 h-4" />
          </label>

          <label className="relative w-full my-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="input input-sm input-bordered w-full pl-3 pr-3 py-2"
              required
            />
            <FaKey className="absolute right-3 bottom-2 text-gray-500" />
          </label>

          <div className="flex justify-between md:flex-row mt-8 gap-3">
            <button
              type="submit"
              className=" cursor-pointer bg-[#6e29b2] text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded hover:scale-105 transition-transform"
            >
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
            <button
              type="button"
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              Forget password?
            </button>
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
    </>
  );
}

export default Login;

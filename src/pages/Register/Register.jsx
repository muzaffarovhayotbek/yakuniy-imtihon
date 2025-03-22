import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { backend } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
function Register() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password.length < 6) {
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

    const userData = {
      username: user,
      email,
      password,
    };
    console.log(userData);

    backend
      .post('auth/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Royxatdan otish muvaffaqiyatli');
          navigate('/login');
        }
      })
      .catch((error) => {
        const message =
          error.response?.data.message || 'Server bilan muammo mavjud';
        toast.error(message);
      });
  }

  return (
    <div className="container mx-auto m-auto">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <form className="flex items-center justify-center mt-10">
        <div className="flex flex-col gap-4 w-[448px]">
          <label className="relative w-full">
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              placeholder="User"
              required
              className="input input-sm input-bordered w-full pl-3 p-4 rounded-md bg-black text-white"
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
              className="input input-sm input-bordered w-full pl-3 p-4 rounded-md bg-black text-white"
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
              className="input input-sm input-bordered w-full pl-3 p-4 rounded-md bg-black text-white"
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
              className="input input-sm input-bordered w-full pl-3 p-4 rounded-md bg-black text-white"
            />
          </label>
        </div>
      </form>
      <div className="flex gap-5 md:flex-row justify-center mt-8">
        <button
          onClick={handleAdd}
          className="text-[14px] cursor-pointer bg-blue-600 rounded-md p-4"
        >
          Register
        </button>
        <button className="flex items-center gap-1 bg-black text-white rounded-md p-4 cursor-pointer">
          Google <FcGoogle />
        </button>
      </div>
      <div className="text-center flex items-center gap-4 justify-center mt-4">
        <p className="mt-2 text-sm text-gray-600">Already have an account?</p>
        <a
          className="font-medium text-indigo-600 hover:text-indigo-500"
          href="/login"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

export default Register;

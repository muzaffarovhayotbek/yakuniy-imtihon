import React from 'react';

function Login() {
  return (
    <div className="container mx-auto w-full max-w-md space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <form className="flex flex-col gap-2 p-[16px] w-[448px]">
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2 ">
          <input type="email" placeholder="Email" className="grow" required />
        </label>
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
          <input
            type="password"
            placeholder="Password"
            className="grow"
            required
          />
        </label>
        <div className="flex flex-col gap-5 md:flex-row">
          <button className="btn btn-secondary btn-sm grow md:btn-md">
            Sing in
          </button>
          <button className="btn btn-secondary btn-sm grow md:btn-md">
            <span>Google</span>
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div>
          <button className="cursor underline moda">Forget password ?</button>
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

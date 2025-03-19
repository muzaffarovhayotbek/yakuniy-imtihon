import React from 'react';

function Register() {
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form>
          <div className="flex gap-5 flex-col md:flex-row">
            <button className="btn btn-sm md:btn-md grow btn-secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

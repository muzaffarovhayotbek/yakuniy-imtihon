import React from 'react';

function Contact() {
  return (
    <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-10 text-center">
      <form
        className="flex w-4/5 md:w-2/5 flex-col items-center justify-center gap-5 mt-10"
      >
        <label className="text-2xl md:text-4xl">Contact</label>
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
          <input
            className="w-full pl-4 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Name"
            required
          />
        </label>
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
          <input
            className="w-full pl-4 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Message"
            required
          />
        </label>
        <button className="w-full px-3 p-4 text-sm md:text-base bg-gray-600 text-white rounded-2xl hover:bg-gray-700 cursor-pointer">
          Sumbit
        </button>
      </form>
    </div>
  );
}

export default Contact;

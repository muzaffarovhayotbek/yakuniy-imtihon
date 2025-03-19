import React from 'react';

function Contact() {
  return (
    <div className="container mx-auto">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 ">
        <form className="flex w-4/5 md:w-2/5 flex-col items-center justify-center gap-5">
          <label className="text-2xl md:text-4xl">Contact</label>
          <input
            type="text"
            placeholder="me"
            className="p-3 m-2 w-[342px] grow  "
          />
          <button
            type="submit"
            className="p-4 text-[14px] bg-blue-500 rounded-md w-[342px] text-white cursor-pointer"
          >
            Sumbit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

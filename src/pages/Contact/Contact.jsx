import React from 'react';

function Contact() {
  return (
    <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-10 text-center">
      <form className="flex w-4/5 md:w-2/5 flex-col items-center justify-center gap-5">
        <label className="text-[36px] md:text-4xl]">Contact</label>
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
          <input className="grow" type="text" placeholder="Name" required />
        </label>
        <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md my-2">
          <input className="grow" type="text" placeholder="Message" required />
        </label>
        <button className="bg-blue-500 p-[16px] w-[342px] text-[14px] mb-10 ">
          Sumbit
        </button>
      </form>
    </div>
  );
}

export default Contact;

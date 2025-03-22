import React, { useState, useEffect } from 'react';
import { CgMail } from 'react-icons/cg';
import { Form, useActionData } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toast';

function Modal() {
  const [emailForReset, setEmailForReset] = useState('');
  const data = useActionData();

  useEffect(() => {
    if (data?.emailForReset) {
      sendPasswordResetEmail(auth, data.emailForReset)
        .then(() => {
          toast.success('Verification email sent!');
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  }, [data]);

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-black mb-4">Reset password</h3>
        <Form method="post">
          <label className="relative w-full my-2">
            <input
              type="email"
              placeholder="Email"
              className="input input-sm input-bordered w-full pl-3 pr-3 py-2 rotate-md"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)} // emailni saqlash
              required
            />
            <CgMail className="absolute right-3 bottom-2 w-4 h-4" />
          </label>
        </Form>

        <div className="modal-action flex justify-between mb-4">
          <button
            onClick={() => document.getElementById('my_modal_1').close()}
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-2"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2 mb-2 ">
            Send
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;

import React, { useEffect, useState } from 'react';
import { CgMail } from 'react-icons/cg';
import { Form, useActionData } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/firabageConfig';
import toast from 'react-hot-toast';
function Modal() {
  const data = useActionData();
  const [email, setEmail] = useState('');

  useEffect(()=> {
    if(data?.emailForReste){
      sendPasswordResetEmail(auth, data.emailForReste)
      .then(() => {
      toast.success('Verification sended !')
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage)
      }); 
    }

  } , [data])

  return (
    <dialog id="my_modal_1" className="modal sm:flex">
      <div className="modal-box">
        <h3 className="font-bold text-black mb-4">Reset password</h3>
        
        <Form method="post">
          <label className="relative block">
            <input
              type="email"
              placeholder="Email"
              name="email_for_reset" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <CgMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </label>

          <div className="modal-action">
            <button
              type="button"
              onClick={() => document.getElementById('my_modal_1').close()}
              className="btn"
            >
              Close
            </button>
            <button type="submit" className="bg-blue-500 p-2 rounded-md mt-4">
              Send
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
}

export default Modal;

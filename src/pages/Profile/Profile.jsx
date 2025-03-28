import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/firabageConfig';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

function Profile() {
  const { user } = useGlobalContext();
  const [imageBase64, setImageBase64] = useState(null);
  const [follow, setFollow] = useState(false);

  console.log(user);

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success('Verification email is sent!');
      })
      .catch((error) => {
        toast.error('Error sending verification email: ' + error.message);
      });
  };

  const imageChangeBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.size <= 1024 * 1024) {
      reader.addEventListener('load', () => {
        setImageBase64(reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      toast.warn('Oops, Images must be less than 1MB');
    }
  };

  const cancelImageSaving = () => {
    setImageBase64(null);
  };

  const handleFollow = () => {
    setFollow(!follow);
  };

  return (
    <div className="items-center py-10">
      <div className="flex gap-5 flex-col md:flex-row">
        <div className="flex flex-col justify-center">
          <img
            src={imageBase64 ?? user.photoURL}
            className="h-40 w-40 rounded-full object-cover mx-auto mb-5"
            alt={user.displayName + ' avatar'}
          />

          {!imageBase64 && (
            <div className="flex flex-col gap-3 card max-w-96 bg-base-200 shadow-xl p-5 rounded-lg">
              <input
                onChange={imageChangeBase64}
                type="file"
                accept="image/*"
                className="file-input file-input-primary file-input-sm mx-auto max-w-96 cursor-pointer"
              />
              <h2 className="pt-3 card-title capitalize text-xl font-semibold">
                {user.displayName}
              </h2>
              <p className="capitalize text-xl font-semibold pt-2 pb-2">
                Software Engineer at OpenAI
              </p>
              <p className="capitalize text-xl font-normal">
                John enjoys working on challenging problems and is passionate
                about AI technology.
              </p>
              <div className="flex justify-end gap-4">
              <button
  onClick={handleFollow}
  className={`px-4 py-2 text-sm ${follow ? 'bg-blue-500' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 cursor-pointer`}
>
  {follow ? 'Following' : 'Follow'} 
</button>

                <NavLink
                  className="px-4 py-2 text-sm bg-transparent text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer"
                  to="/contact"
                >
                  <button>Message</button>
                </NavLink>
              </div>
            </div>
          )}

          {imageBase64 && (
            <div className="flex flex-col gap-3 card max-w-96 bg-base-200 shadow-xl p-5 rounded-lg">
              <div className="flex gap-4">
                <button
                  onClick={cancelImageSaving}
                  className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save
                </button>
              </div>
              <h2 className="pt-3 card-title capitalize text-xl font-semibold">
                {user.displayName}
              </h2>
              <p className="capitalize text-xl font-semibold pt-2 pb-2">
                Software Engineer at OpenAI
              </p>
              <p className="capitalize text-xl font-normal">
                John enjoys working on challenging problems and is passionate
                about AI technology.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 text-sm text-white rounded-md hover:bg-blue-600`}
                >
                  {follow ? 'Following' : 'Follow'}
                </button>
                <NavLink
                  className="px-4 py-2 text-sm bg-transparent text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                  to="/contact"
                >
                  <button>Message</button>
                </NavLink>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-500 grow gap-5 rounded-lg grid md:grid-cols-2 p-5">
          <h2>
            <span className="font-medium block">Display Name:</span>
            <span>{user.displayName} </span>
          </h2>
          <h2>
            <span className="font-medium block">Status:</span>
            <span>
              {user.emailVerified ? (
                'Verified ✅'
              ) : (
                <span className="flex items-center gap-2">
                  <span>Not Verified</span>
                  <button
                    onClick={sendVerification}
                    className="bg-blue-500 rounded-md p-2"
                  >
                    Send
                  </button>
                </span>
              )}
            </span>
          </h2>
          <h2>
            <span className="font-medium block">Email:</span>
            <span>{user.email} </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;

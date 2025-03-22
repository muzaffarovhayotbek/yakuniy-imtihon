import React, { useState } from 'react';

function Profile() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [follow, setFollow] = useState('follow');

  function handleFollow() {
    setFollow((prev) => (prev === 'follow' ? 'following' : 'follow'));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Iltimos, rasm faylini tanlang.');
    }
  }
  return (
    <div className="container mx-auto mt-6">
      <div className="flex flex-col gap-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="flex flex-col gap-1"
        />
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Upload"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleFollow}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          {follow}
        </button>
        <a
          className="px-3 py-1 text-sm font-medium text-gray-700 bg-transparent rounded-md hover:bg-gray-100"
          href="/contact"
        >
          Message
        </a>
      </div>
    </div>
  );
}

export default Profile;

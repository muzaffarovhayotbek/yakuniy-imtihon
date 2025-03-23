import React from 'react'

function LikedImages() {
  return (
    <div className='container mx-auto  flex h-full flex-col items-center justify-center gap-10 text-center mt-50'>
      <p className='text-2xl md:text-4xl'>You don't have liked image</p>
      <a
        className="bg-gray-500 text-white px-2 py-1 text-xs rounded md:px-4 md:py-2 md:text-base"
        href="/"
      >
        Back home
      </a>
    </div>
  )
}

export default LikedImages

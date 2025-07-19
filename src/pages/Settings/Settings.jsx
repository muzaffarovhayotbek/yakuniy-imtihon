import React, { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { SiSpringsecurity } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className='container mx-auto px-4'>
      <h2 className='text-[40px] my-[24px] text-[#212529]'>Sozlamalar</h2>

      <div className='flex gap-8'>
        {/* Chap menyu */}
        <div className='bg-red-700 w-[193px] flex-shrink-0 flex flex-col gap-2 p-4 rounded-md box-border'>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setActiveTab('profile')}>
            <CiUser className='w-[16px] h-[16px]' />
            <span className='text-[16px] text-[#0D6EFD]'>Profile</span>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setActiveTab('security')}>
            <SiSpringsecurity className='w-[16px] h-[16px]' />
            <span className='text-[16px] text-[#0D6EFD]'>Xavfsizlik</span>
          </div>
          <div className='cursor-pointer' onClick={() => setActiveTab('notifications')}>
            <span className='text-[16px] text-[#0D6EFD]'>Bildirishnomalar</span>
          </div>
          <div className='cursor-pointer' onClick={() => setActiveTab('system')}>
            <span className='text-[16px] text-[#0D6EFD]'>Tizim Sozlamalari</span>
          </div>
          <div className='cursor-pointer' onClick={() => setActiveTab('backup')}>
            <span className='text-[16px] text-[#0D6EFD]'>Zaxiralash</span>
          </div>
        </div>

        {/* O'ng kontent */}
        <div className='flex-1 min-w-0 p-4 border rounded-md bg-white'>
          {activeTab === 'profile' && (
            <div>
              <h3 className='text-lg font-semibold mb-4'>Profil Sozlamalari</h3>
              <form className='grid grid-cols-2 gap-4'>
                <div>
                  <label>Ism</label>
                  <input type="text" placeholder="Ismingiz" className='border p-2 w-full rounded' />
                </div>
                <div>
                  <label>Familiya</label>
                  <input type="text" placeholder="Familiyangiz" className='border p-2 w-full rounded' />
                </div>
                <div className='col-span-2'>
                  <label>Elektron Pochta</label>
                  <input type="email" placeholder="email@example.com" className='border p-2 w-full rounded' />
                </div>
                <div className='col-span-2'>
                  <label>Telefon</label>
                  <input type="text" placeholder="+998..." className='border p-2 w-full rounded' />
                </div>
                <div className='col-span-2'>
                  <label>Profil Rasmi</label>
                  <input type="file" className='border p-2 w-full rounded' />
                </div>
                <div className='col-span-2 text-right'>
                  <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2'>
                    <MdSaveAlt className='w-[16px] h-4 text-white' /> Saqlash
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className='text-lg font-semibold mb-4'>Xavfsizlik Sozlamalari</h3>
              <p>Parolni yangilash va boshqa xavfsizlik parametrlarini sozlang.</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className='text-[20px] font-semibold mb-4'>Bildirishnomalar Sozlamalari</h3>
              <hr />
              <h2 className='text-[16px] text-[#212529] mt-2'>Email Bildirishnomalari</h2>
              <div className='flex items-center gap-2 mt-4'>
                <input type="checkbox" className='w-[16px] h-[16px]' />
                <h2>Parol tiklash haqida xabar berish</h2>
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <input type="checkbox" className='w-[16px] h-[16px]' />
                <h2>Sign in Bildirishnomalar</h2>
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <input type="checkbox" className='w-[16px] h-[16px]' />
                <h2>Rasmni o'chirish haqida</h2>
              </div>
              <div className='text-right'>
                <button type='submit' className='flex items-center gap-2 bg-[#0D6EFD] text-white px-4 py-2 rounded-md mt-4'>
                  <MdSaveAlt className='w-[16px] h-4 text-white' /> Saqlash
                </button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h3 className='text-lg font-semibold mb-4'>Tizim Sozlamalari</h3>
              <p>Tez orada</p>
            </div>
          )}

          {activeTab === 'backup' && (
            <div>
              <h3 className='text-lg font-semibold mb-4'>Zaxiralash Sozlamalari</h3>
              <p>Tez orada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;

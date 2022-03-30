import { HomeOutlined, PaperClipOutlined, PhoneOutlined } from '@ant-design/icons'
import React from 'react'
import './Contact.css'

export default function Contact() {
  return (
    <div className='h-screen container'>
      <div className='flex items-center justify-center h-full'>
        <div className='w-4/5 h-2/3 mx-auto grid grid-cols-2 rounded-lg shadow-xl '>
          <div className='flex items-center '>
            <div className='ml-4 p-1 border border-gray-200 rounded-lg'>
              <img className=' rounded-lg' src={require('../../assets/imgs/IMG_4536.png')} alt={'abc'} />
            </div>
          </div>
          <div className='info_wrap p-10' >
            <h3 className='text-3xl relative'>Contact me</h3>
            <p>
              I'm open for any suggestion or just to have a chat
            </p>
            <div className=''>
              <div className='flex items-center mb-5'>
                <HomeOutlined className='p-3 rounded-full text-xl border border-gray-200 mr-3 text-black' />
                <p className='m-0 text-lg text-gray-500'>
                  <span className='text-black font-semibold'>Address: </span>số 102, ngõ 44, Trần Thái
                  Tông, Q. Cầu Giấy, Hà Nội
                </p>
              </div>
              <div className='flex items-center mb-5'>
                <PhoneOutlined className='p-3 rounded-full text-xl border border-gray-200 mr-3 text-black' />
                <p className='m-0 text-lg text-gray-500'>
                  <span className='text-black font-semibold'>Phone: </span> 0968490919
                </p>
              </div>
              <div className='flex items-center mb-5'>
                <PaperClipOutlined className='p-3 rounded-full text-xl border border-gray-200 mr-3 text-black' />
                <p className='m-0 text-lg text-gray-500'>
                  <span className='text-black font-semibold'>Email: </span> ngthequan26@gmail.com
                </p>
              </div>
              <div className='w-full flex justify-center mb-3'>
                <a href="mailto: ngthequan26@gmail.com" className='bg-purple-600 w-1/3 text-center text-white p-2 hover:text-white rounded-lg hover:bg-purple-700 text-xl shadow-lg'>Send Email</a>
              </div>
              <div className='flex items-center justify-center'>
                <a href="https://www.facebook.com/profile.php?id=100005135208157" type="button" className="rounded-full border-2 border-gray-500 text-gray-500 leading-normal uppercase hover:bg-purple-400 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="w-2 h-full mx-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a href="https://github.com/D4r1inG/" type="button" className="rounded-full border-2 border-gray-500 text-gray-500 leading-normal uppercase hover:bg-purple-400 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" className="w-3 h-full mx-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

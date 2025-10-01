import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='sticky top-0 z-40 flex items-center py-2 px-[4%] justify-between bg-white/80  backdrop-blur supports-[backdrop-filter]:bg-white/60  border-b border-gray-200 '>
        <img className='w-[64px] h-auto' src={assets.logo} alt="" />
        <div className='flex items-center gap-3'>
          <button onClick={()=> setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
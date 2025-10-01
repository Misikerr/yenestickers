import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { FiMoon, FiSun, FiChevronLeft } from 'react-icons/fi'
import {assets} from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible,setVisible] = useState(false);
  const [isDark,setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if(stored){
      return stored === 'dark'
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  });

  useEffect(()=>{
    const root = document.documentElement;
    if(isDark){
      root.classList.add('dark');
      localStorage.setItem('theme','dark');
    }else{
      root.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  },[isDark])

  // Prevent background scroll when mobile menu is open
  useEffect(()=>{
    if(visible){
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  },[visible])

  const { setShowSearch , getCartCount, navigate, token , setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-3 font-medium sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-gray-200 dark:border-gray-800'>

        <Link to='/' className='shrink-0'><img src={assets.logo} className='w-14 sm:w-16 md:w-20 h-auto' alt="Stickers logo" /></Link>

        <ul className='hidden sm:flex gap-8 text-sm text-gray-700 dark:text-primary-50 items-center'>

          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink to='/shop' className='flex flex-col items-center gap-2'>
            <p>SHOP</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden' />
          </NavLink>
          <Link to='/#after-hero' className='flex flex-col items-center gap-2'>
            <p> HOW TO ORDER</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden' />
          </Link>

          <NavLink to='/about' className='flex flex-col items-center gap-2'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-2'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 hidden' />
          </NavLink>

        </ul>

        <div className='flex items-center gap-4'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            
            <div className='group relative'>
              <img onClick={()=> token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {
                  token && 
                  <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-100 rounded shadow-lg border border-gray-200 dark:border-gray-700'>
                      <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black dark:hover:text-white'>ORDERS</p>
                      <p onClick={logout} className='cursor-pointer hover:text-black dark:hover:text-white'>LOG Out</p>
                    </div>
                  </div>
                }
            </div>
            {/* Theme toggle */}
            <button onClick={()=>setIsDark(v=>!v)} className='w-9 h-9 grid place-items-center rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' aria-label='Toggle theme'>
              <FiMoon className='text-gray-700 dark:hidden' />
              <FiSun className='hidden dark:block text-yellow-300' />
            </button>
            <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
                {/* Dropdown Menu */}
        {/* Sidebar menu for small screens */}
        <div className={`fixed inset-0 z-60 sm:hidden transition-opacity ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div onClick={()=>setVisible(false)} className='absolute inset-0 bg-black/60' />
          <div className={`absolute left-3 right-3 top-16 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-gray-800 dark:text-primary-50 shadow-2xl overflow-hidden ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all`}>
            <div className='px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3'>
              <button onClick={()=>setVisible(false)} className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300' aria-label='Back'>
                <FiChevronLeft />
                <span>Back</span>
              </button>
            </div>
            <nav className='divide-y divide-gray-200 dark:divide-gray-800'>
              <NavLink to='/' onClick={()=>setVisible(false)} className='block px-5 py-4 text-base'>Home</NavLink>
              <NavLink to='/shop' onClick={()=>setVisible(false)} className='block px-5 py-4 text-base'>Shop</NavLink>
              <Link to='/#after-hero' onClick={()=>setVisible(false)} className='block px-5 py-4 text-base'>How to Order</Link>
              <NavLink to='/about' onClick={()=>setVisible(false)} className='block px-5 py-4 text-base'>About</NavLink>
              <NavLink to='/contact' onClick={()=>setVisible(false)} className='block px-5 py-4 text-base'>Contact Us</NavLink>
            </nav>
          </div>
        </div>
    </div>
  )
}

export default Navbar
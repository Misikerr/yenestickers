import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('shop')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 dark:bg-slate-900 text-center sticky top-[52px] z-40'>
        <div className='inline-flex items-center justify-center border border-gray-400 dark:border-gray-700 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white dark:bg-slate-800'>
            <input className='flex-1 outline-none bg-inherit text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300' type='text' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt=""/>
    </div>
  ) : null
}

export default SearchBar
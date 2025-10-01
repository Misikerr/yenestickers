import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-primary-50'>
        <div >
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Fast & Friendly Delivery</p>
            <p className='text-gray-400 dark:text-gray-400'>Fast and reliable delivery to all locations at Arbaminch.</p>
        </div>
        <div >
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Premium Quality</p>
            <p className='text-gray-400 dark:text-gray-400'>Premium quality materials and printing.</p>
        </div>
        <div >
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Helpful Human Support</p>
            <p className='text-gray-400 dark:text-gray-400'>Message us anytime we’re happy to help.</p>
        </div>
    </div>
  )
}

export default OurPolicy
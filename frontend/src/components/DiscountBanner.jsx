import React from 'react'

const DiscountBanner = () => {
  return (
    <section className='bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-10 flex flex-col items-center text-center'>
      <div>
        <h3 className='text-2xl font-extrabold text-primary-700'>YeneStickers Special Discount!</h3>
        <p className='mt-1 text-gray-700 dark:text-primary-50'>Order more, save more!</p>
        <div className='mt-5 grid sm:grid-cols-3 gap-4 text-gray-800 dark:text-primary-50'>
          <div className='p-4 rounded-lg'>
            <p className='font-bold'>Tiny</p>
            <p>5+ <span className='text-primary-600 font-semibold'>31.5ብር</span> • 10% off</p>
            <p>10+ <span className='text-primary-600 font-semibold'>28ብር</span> • 20% off</p>
          </div>
          <div className='p-4 rounded-lg'>
            <p className='font-bold'>Small</p>
            <p>5+ <span className='text-primary-600 font-semibold'>37ብር</span> • 7.5% off</p>
            <p>10+ <span className='text-primary-600 font-semibold'>34ብር</span> • 15% off</p>
          </div>
          <div className='p-4 rounded-lg'>
            <p className='font-bold'>Large</p>
            <p>5+ <span className='text-primary-600 font-semibold'>40.5ብር</span> • 10% off</p>
            <p>10+ <span className='text-primary-600 font-semibold'>36ብር</span> • 20% off</p>
          </div>
        </div>
        <p className='mt-4 text-sm text-gray-600 dark:text-primary-50/80'>Valid on orders of <b>5</b> or more per size! Bigger discount for 10+!</p>
      </div>
    </section>
  )
}

export default DiscountBanner



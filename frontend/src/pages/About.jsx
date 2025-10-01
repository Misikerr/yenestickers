import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    
    <div className='my-10 flex flex-col md:flex-row gap-10 md:gap-16'>
      <img className='w-full md:max-w-[450px] rounded-xl object-cover' src={assets.logo} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 dark:text-gray-300'>
        <p>
          We’re university students with an eye for aesthetics, turning notebooks, laptops, and phone cases into a vibe. 
          የኔ_Stickers started on campus late nights, coffee, and a shared love for clean designs that feel personal.
        </p>
        <p>
          From minimal icons to bold anime, memes, and custom skins, everything is made to match your style and your study flow. 
          Our premium vinyl stickers and laptop skins are durable, smooth to the touch, water‑resistant, and made to last through semesters.
        </p>
        <b className='text-gray-800'>What We’re About</b>
        <p>
          Style that works hard. Quick ordering, fair prices, and local delivery in Arba Minch. 
          Whether you want a subtle aesthetic or a statement piece, we help your tech look as focused (or fun) as you are.
        </p>
      </div>
    </div>

    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-3 text-sm mb-20 gap-6'>
      <div className='border px-8 md:px-10 py-8 sm:py-14 flex flex-col gap-5 rounded-lg dark:border-gray-700'>
        <b>Premium Materials</b>
        <p className='text-gray-600 dark:text-gray-300'>Thick, durable vinyl with vibrant print and a smooth finish built to last.</p>
      </div>
      <div className='border px-8 md:px-10 py-8 sm:py-14 flex flex-col gap-5 rounded-lg dark:border-gray-700'>
        <b>Simple Ordering</b>
        <p className='text-gray-600 dark:text-gray-300'>Browse, add to cart, and choose delivery—designed to be fast and easy.</p>
      </div>
      <div className='border px-8 md:px-10 py-8 sm:py-14 flex flex-col gap-5 rounded-lg dark:border-gray-700'>
        <b>Local Support</b>
        <p className='text-gray-600 dark:text-gray-300'>We’re nearby and responsive. Need help or a custom sticker? Just ask.</p>
      </div>
    </div>

    </div>
  )
}

export default About
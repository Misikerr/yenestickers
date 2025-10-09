import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center'>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Welcome to <span className="text-purple-600 dark:text-purple-600">የኔ_Stickers</span>! 🎨
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
          Transform your world with <span className="font-semibold text-indigo-400 dark:text-indigo-400">1000+ unique stickers</span> and premium laptop skins that express your personality!
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mb-12'>
          <Link to='#after-hero' className='bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 z-0'>
            <span>🛍️</span> How To Order?
          </Link>
          <a
            href="https://t.me/YeneStickersAdmin"
            target="_blank"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
            <span>🎁</span> Order Custom Stickers
          </a>
        </div>
        <div className='mt-16'>
          <a href='#after-hero' className='inline-block text-purple-600 hover:text-purple-700 transition-colors animate-bounce' aria-label='Scroll down'>
            <svg width="28" height="36" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='drop-shadow-sm'>
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
                <path d="M6 15l6 6 6-6"/>
                <path d="M6 21l6 6 6-6"/>
              </g>
            </svg>
          </a>
        </div>
      
    </section>
  )
}

export default Hero

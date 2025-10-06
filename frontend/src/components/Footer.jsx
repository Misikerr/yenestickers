import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
    <div className='max-w-5xl mx-auto px-4 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 mt-14 mb-8 text-sm'>

        <div className='mb-5 max-w-sm pr-4'>
            <h3 className="text-xl font-bold text-purple-600 mb-3">የኔ_Stickers</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Your premier destination for <span className="font-semibold">1000+ unique stickers</span> and premium laptop skins. 
                Express your personality with our creative designs! 🎨✨
            </p>
        </div>

        <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-1 text-gray-600 dark:text-white">
                <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600">Shop</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600">Laptop Skins</Link></li>
                <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
                <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
                <li><a href="https://www.admin.yenestickers.store/" className="hover:text-purple-600" target="_blank" rel="noreferrer">Admin</a></li>
            </ul>
        </div>

        <div>
            <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
            <div className="space-y-2 text-sm">
                <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 12.36 12.36 0 003.88.62 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.44a1 1 0 011 1 12.36 12.36 0 00.62 3.88 1 1 0 01-.24 1.01l-2.2 2.2z"/>
                    </svg>
                    <span>+251 944037042</span>
                </p>
                <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                    </svg>
                    <span>Arba Minch, Ethiopia</span>
                </p>
            </div>
        </div>
    </div>

        <div className="text-center py-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-4">
            <p>&copy; 2026 <span className="font-semibold text-purple-600">የኔ_Stickers</span>. All rights reserved.</p>
        </div>
        </div>
  )
}

export default Footer

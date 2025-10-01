import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ title, price, features, accent=false }) => (
  <div className={`rounded-2xl p-6 border ${accent ? 'border-primary-600' : 'border-gray-200'} bg-white dark:bg-gray-900`}> 
    <h4 className='text-xl font-bold'>{title}</h4>
    <p className='mt-3 text-3xl font-extrabold text-primary-600'>{price}</p>
    <ul className='mt-5 space-y-3 text-gray-700 dark:text-primary-50'>
      {features.map((f, idx) => <li key={idx}>{f}</li>)}
    </ul>
  </div>
)

const PricingCards = () => {
  return (
    <section className='my-16'>
      <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Price Information
          </h2>

          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-7 text-center border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Tiny Stickers</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">35ብር</p>
              <ul className="text-gray-600 space-y-2 text-left">
                <li><i className="fas fa-image text-rose-500"></i> 600" x 600" px size</li>
                <li><i className="fas fa-mobile-alt text-emerald-500"></i> Perfect for Phone Cases</li>
                <li><i className="fas fa-heart text-rose-500"></i> Good for laptops</li>
                <li><i className="fas fa-tint text-blue-500"></i> Water-resistant and durable</li>
                <li><i className="fas fa-palette text-amber-500"></i> High-quality vinyl</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-7 text-center border-2 border-purple-500 dark:border-purple-400">
              <h3 className="text-xl font-bold mb-4">Small Stickers</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">40ብር</p>
              <ul className="text-gray-600 text-left space-y-2">
                <li><i className="fas fa-image text-rose-500"></i> <strong>900"x900" px</strong> – clean & crisp size</li>
                <li><i className="fas fa-laptop text-emerald-500"></i> <strong>Perfect fit</strong> for laptops</li>
                <li><i className="fas fa-heart text-rose-500"></i> <strong>Student favorite</strong> on campus</li>
                <li><i className="fas fa-book text-amber-500"></i> <strong>Notebook-ready</strong> and stylish</li>
                <li><i className="fas fa-tint text-blue-500"></i> <strong>Water-resistant</strong> & long-lasting</li>
                <li><i className="fas fa-palette text-amber-500"></i> <strong>Premium vinyl</strong> for a smooth finish</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-7 text-center border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Large Stickers</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">45ብር</p>
              <ul className="text-gray-600 text-left space-y-2">
                <li><i className="fas fa-image text-rose-500"></i> 1200" x 1200" px size</li>
                <li><i className="fas fa-home text-emerald-500"></i> Perfect for walls,notebooks and dorms</li>
                <li><i className="fas fa-heart text-rose-500"></i> Loved by many customers</li>
                <li><i className="fas fa-tint text-blue-500"></i> Water-resistant and durable</li>
                <li><i className="fas fa-palette text-amber-500"></i> Premium vinyl</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-7 text-center border-2 border-blue-500 dark:border-blue-400">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">Laptop Skins <i className="fas fa-laptop text-2xl"></i></h3>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li><span className="text-3xl font-bold text-purple-600 mb-4">499.99ብር</span></li>
              </ul>
              <ul className="text-gray-600 text-left space-y-2 mb-4">
                <li><i className="fas fa-magic text-amber-500"></i> <span className="font-semibold">Transform your laptop's look instantly!</span></li>
                <li><i className="fas fa-shield-alt text-emerald-500"></i> <span className="font-semibold">Protects from scratches & dust</span></li>
                <li><i className="fas fa-palette text-amber-500"></i> <span className="font-semibold">Unique, vibrant designs</span></li>
                <li><i className="fas fa-sync text-blue-500"></i> <span className="font-semibold">Easy to apply & remove, leaves no residue</span></li>
                <li><i className="fas fa-gift text-rose-500"></i> <span className="font-semibold">Perfect gift for students & professionals</span></li>
              </ul>
              <p className="text-blue-700 dark:text-blue-300 text-base font-semibold flex items-center justify-center gap-1">Upgrade your style & stand out! <i class="fas fa-rocket"></i></p>
            </div>
          </div>
          
          <div className="animate-bounce flex justify-center mt-8 mb-8">
            <Link to="/shop" className="group relative overflow-hidden px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white text-lg font-semibold shadow-2xl flex items-center gap-3 hover:scale-110 transition-transform duration-300 before:absolute before:inset-0 before:bg-gray-50 before:opacity-0 before:group-hover:opacity-10 before:transition-opacity before:duration-300 ">
              <span className="relative z-10 flex items-center gap-2"><i className="fas fa-laptop text-2xl animate-bounce"></i>Browse Laptop Skins</span>
            </Link>
          </div>
          </div>
    </section>
  )
}

export default PricingCards



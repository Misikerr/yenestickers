import React from 'react'
import { Link } from 'react-router-dom'

const HowToOrder = () => {
  return (

    <section className="py-20 text-slate-900 dark:text-white" id="how-to-order">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            <div>
              <h2 className=" text-3xl md:text-4xl font-extrabold text-center mb-6">
                CHOOSE FROM OUR<br />1000+ STICKERS & SKINS
              </h2>
              <ol className="list-decimal list-inside text-[#078BA6E2] dark:text-[#078BA6E2] marker:text-[#078BA6E2] dark:marker:text-[#078BA6E2] [&>li]:text-[#078BA6E2] dark:[&>li]:text-[#078BA6E2] space-y-2 mb-6">
                <li>
                  Open the shop: <Link to="/shop" className="text-blue-500 dark:text-blue-500 underline">YeneStickers.store/shop</Link>
                </li>
                <li>Pick your size and quantity for each sticker or skin.</li>
                <li>
                  Click the <span className="font-bold text-[#078ba6f9] dark:text-[#078ba6]">ADD TO CART</span> under your favorite item to add it to the cart.
                </li>
                <li>
                  Tap the cart icon at the top to review your selections and adjust quantities.
                </li>
                <li>
                  Subtotal must be <span className="font-semibold text-[#078ba6f9] dark:text-[#078ba6]">≥ 100 ብር</span> to checkout. For smaller orders, use our Telegram instead.
                </li>
                <li>
                  Proceed to checkout, fill delivery info, choose delivery option, and continue to payment.
                </li>
                <li>
                  Upload your payment screenshot for quick verification. We’ll confirm and deliver.
                </li>
              </ol>
              <p className="text-lg text-left font-semibold mb-6">
                Discover unique, high-quality stickers designed to express your personality and style. Let your creativity shine with our custom sticker collection!
              </p>
              <div className="animate-bounce flex justify-center mt-8">
                <Link
                  to="/shop"
                  className="group relative overflow-hidden px-8 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-lg font-semibold shadow-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 before:absolute before:inset-0 before:bg-gray-50 before:opacity-0 before:group-hover:opacity-10 before:transition-opacity before:duration-300 z-0"
                ><span>🛍️</span>Browse Stickers</Link>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
                HOW TO ORDER<br />CUSTOM STICKERS
              </h2>
              <ol className="list-decimal list-inside text-[#078BA6E2] dark:text-[#078BA6E2] marker:text-[#078BA6E2] dark:marker:text-[#078BA6E2] [&>li]:text-[#078BA6E2] dark:[&>li]:text-[#078BA6E2] space-y-2 mb-6">
                <li>
                  Contact our Order Account on
                  <a
                    href="https://t.me/YeneStickersAdmin"
                    target="_blank"
                    className="text-blue-500 dark:text-blue-500 underline"
                  >Telegram</a>
                </li>
                <li>
                  Upload your photos that you want turned into stickers. We'll
                  design the outline for you.
                </li>
                <li>
                  Select the size you want, and the amount of each photo you
                  have sent.
                </li>
                <li>
                  We'll ask you for your personal details, and your delivery
                  method.
                </li>
                <li>
                  It's that easy! We'll contact you when your stickers are
                  ready.
                </li>
              </ol>
              <p className="text-lg text-left font-semibold mb-6">
                Ordering custom stickers is easy and fun! Whether you want to showcase your art, brand, or favorite moments, we turn your ideas into high-quality stickers.
              </p>
              <div className="animate-bounce flex justify-center mt-8">
                <a
                  href="https://t.me/YeneStickersAdmin"
                  target="_blank"
                  className="group relative overflow-hidden px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 text-white text-lg font-semibold shadow-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 before:absolute before:inset-0 before:bg-gray-50 before:opacity-0 before:group-hover:opacity-10 before:transition-opacity before:duration-300"
                ><span>🎁</span> Order Custom Stickers</a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowToOrder



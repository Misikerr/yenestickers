import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {

  const { products, currency, cartItems , updateQuantity, navigate, getCartAmount, serverPricing, token } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(()=>{

    if (products.length > 0){
      const tempData = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0){
            tempData.push({
              _id: items,
              size:item,
              quantity:cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    } else {
      setCartData([]);
    }
    
  },[cartItems,products])// add products

  const [goingCheckout, setGoingCheckout] = useState(false);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=> product._id === item._id);
            if (!productData) return null;
            const line = serverPricing?.lines?.find(l => l.productId === item._id && l.size === item.size);
            const baseUnit = line ? line.unitBase : (productData?.price || 0);
            const discountPercent = line ? line.discountPercent : 0;
            const unitAfter = line ? line.unitAfter : baseUnit;

            return (
            <div key={index} className='py-4 border-t border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_2fr_0.5fr] items-start sm:items-center gap-3 sm:gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded-md border border-gray-200 dark:border-gray-700' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium text-gray-900 dark:text-white'>{productData.name}</p>
                      <div className='flex items-center gap-3 sm:gap-5 mt-2 flex-wrap'>
                        <p className='flex items-center gap-2'>
                          {discountPercent>0 && (<span className='line-through opacity-70'>{currency}{baseUnit}.00</span>)}
                          <span className='text-gray-900 dark:text-white'>{currency}{unitAfter}.00</span>
                          {discountPercent>0 && (<span className='text-green-500 dark:text-green-400 text-xs'>({discountPercent}% off)</span>)}
                        </p>
                        <p className='px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-slate-50 dark:bg-slate-800 rounded-md text-sm sm:text-base text-gray-800 dark:text-gray-100 hidden sm:inline-flex'>{item.size}</p>
                      </div>
                  </div>
                </div>
                <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 w-16 sm:w-20 h-9 sm:h-8 px-2 text-center rounded hidden sm:block' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={()=>updateQuantity(item._id, item.size,0)} className='w-4 sm:w-5 cursor-pointer hidden sm:block' src={assets.bin_icon} alt="" />

                {/* Mobile bottom row: size + quantity + delete */}
                <div className='col-span-full flex sm:hidden items-center gap-3 mt-2'>
                  <p className='px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-slate-50 dark:bg-slate-800 rounded-md text-sm text-gray-800 dark:text-gray-100'>{item.size}</p>
                  <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 w-16 h-9 px-2 text-center rounded' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id, item.size,0)} className='w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                </div>
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          {/* Minimum order notice and actions */}
          {getCartAmount() > 0 && getCartAmount() < 100 && (
            <div className='mt-4 mb-2 rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20 p-3 text-sm text-amber-800 dark:text-amber-200'>
              <p>Minimum order for checkout is 100 ብር. For smaller orders, please contact us on Telegram.</p>
              <div className='mt-3 flex justify-between items-center gap-3'>
                <a
                  href='https://t.me/YeneStickerGuy'
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium'
                >
                  Message on Telegram
                </a>
                <span className='text-xs text-amber-700 dark:text-amber-300'>Current subtotal: {currency} {getCartAmount()}.00</span>
              </div>
            </div>
          )}
          <div className='w-full text-end'>
            <button
                            onClick={()=> { 
                if (getCartAmount() >= 100 && !goingCheckout) { 
                  if (!token) {
                    toast.error('Please login to proceed to checkout');
                    navigate('/login');
                    return;
                  }
                  setGoingCheckout(true); 
                  navigate('/place-order'); 
                  setGoingCheckout(false);
                } 
              }}
              aria-disabled={getCartAmount() < 100}
              className={`text-sm my-8 px-8 py-3 rounded-md ${getCartAmount() < 100 || goingCheckout ? 'bg-gray-400 dark:bg-gray-700 text-white cursor-not-allowed opacity-70' : 'bg-black text-white hover:bg-gray-900'}`}
            >
              {getCartAmount() < 100 ? 'MINIMUM 100 ብር TO CHECKOUT' : goingCheckout ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

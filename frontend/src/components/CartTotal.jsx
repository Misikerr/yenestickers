import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title'

const CartTotal = ({ includeShipping = false }) => {

  const {currency, delivery_fee,getCartAmount, serverPricing} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {Number(getCartAmount() || 0).toFixed(2)}</p>
        </div>
        <hr />
        {includeShipping && (
          <>
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
          </>
        )}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {Number(getCartAmount() === 0 ? 0 : getCartAmount() + (includeShipping ? delivery_fee : 0)).toFixed(2)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
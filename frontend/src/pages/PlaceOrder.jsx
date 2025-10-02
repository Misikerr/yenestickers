import React, { useContext, useMemo, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cbe');

  const [formData, setFormData] = useState({
    fullName:'',
    phone:'',
    address:'',
    deliveryOption:'pickup',
    screenshot:'',
    agree:false,
    notes:''
})
const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, products, currency} = useContext(ShopContext);

  const { fullName, phone, address, deliveryOption, notes } = formData;
  
  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!token) {
      toast.error('Please login to place an order');
      navigate('/login');
    }
  }, [token, navigate]);

  const cartTotal = useMemo(()=> getCartAmount(), [getCartAmount]);
  const computedDeliveryFee = useMemo(()=>{
    if(deliveryOption === 'pickup') return 0;
    if(deliveryOption === 'express') return 50;
    return 30;
  },[deliveryOption]);
  const grandTotal = useMemo(()=> (cartTotal || 0) + (cartTotal === 0 ? 0 : computedDeliveryFee),[cartTotal,computedDeliveryFee]);
  const isValidName = useMemo(()=> fullName.trim().length >= 2, [fullName]);
  const isValidPhone = useMemo(()=> /^(09|07)\d{8}$/.test(phone.trim()), [phone]);

  const onChangeHandler = (event) => {
    const name = event.target.name
    let value = event.target.value
    if (event.target.type === 'checkbox') {
      value = event.target.checked
    }
    if (event.target.type === 'file') {
      value = event.target.files && event.target.files[0] ? event.target.files[0] : ''
    }
    setFormData(data => ({...data,[name]:value}))
  }

  const [submitting, setSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (submitting) return;
      setSubmitting(true);

            // Check if user is authenticated before proceeding
      if (!token) {
        toast.error('Please login to place an order');
        navigate('/login');
        return;
      }
      
      
      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: { fullName, phone, address, deliveryOption, notes },
        items: orderItems,
        amount: getCartAmount() + computedDeliveryFee,
        paymentMethod: method
      }

      const formDataToSend = new FormData();
      formDataToSend.append('screenshot', formData.screenshot);
      formDataToSend.append('address', JSON.stringify(orderData.address));
      formDataToSend.append('items', JSON.stringify(orderData.items));
      formDataToSend.append('amount', String(orderData.amount));
      formDataToSend.append('paymentMethod', orderData.paymentMethod);

      const response = await axios.post(
        backendUrl + '/api/order/place',
        formDataToSend,
        { headers:{ token, 'Content-Type': 'multipart/form-data' } }
      )
      if(response.data.success){
          setCartItems({})
          navigate('/orders')
      } else {
        // Check if the error is related to authorization
        if (response.data.message && (
          response.data.message.toLowerCase().includes('not authorized') ||
          response.data.message.toLowerCase().includes('unauthorized') ||
          response.data.message.toLowerCase().includes('login') ||
          response.data.message.toLowerCase().includes('authentication')
        )) {
          toast.error('Please login to continue');
          navigate('/login');
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error)
            // Check if it's an HTTP 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        toast.error('Please login to continue');
        navigate('/login');
      } else if (error.response && error.response.data && error.response.data.message && (
        error.response.data.message.toLowerCase().includes('not authorized') ||
        error.response.data.message.toLowerCase().includes('unauthorized') ||
        error.response.data.message.toLowerCase().includes('login') ||
        error.response.data.message.toLowerCase().includes('authentication')
      )) {
        toast.error('Please login to continue');
        navigate('/login');
      } else {
        toast.error(error.message)
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 sm:max-w-[520px] w-full'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div>
          <label className='block mb-2 font-semibold text-sm sm:text-base'>Name</label>
          <input  onChange={onChangeHandler} name='fullName' value={formData.fullName} type='text' className={`w-full px-3 py-2 rounded-lg border ${fullName && !isValidName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-100 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base`} required placeholder='Enter your full name' />
          {fullName && !isValidName && (<p className='text-xs text-red-600 mt-1'>Please enter your full name.</p>)}
        </div>

        <div>
          <label className='block mb-2 font-semibold text-sm sm:text-base'>Phone Number</label>
          <input  onChange={onChangeHandler} name='phone' value={formData.phone} type='tel' className={`w-full px-3 py-2 rounded-lg border ${phone && !isValidPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-100 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base`} required placeholder='09******** or 07********' />
          {phone && !isValidPhone && (<p className='text-xs text-red-600 mt-1'>Enter a valid 10-digit phone starting with 09 or 07.</p>)}
        </div>

        <div>
          <label className='block mb-2 font-semibold text-sm sm:text-base'>Delivery Option</label>
          <select onChange={onChangeHandler} name='deliveryOption' value={formData.deliveryOption} className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base' required>
            <option value='standard'>Standard Delivery (5–9 days)</option>
            <option value='express'>Express Delivery (1–4 days)</option>
            <option value='pickup'>Pickup (Main Campus)</option>
          </select>
        </div>

        <div>
          <label className='block mb-2 font-semibold text-sm sm:text-base'>Delivery Address</label>
          <select onChange={onChangeHandler} name='address' value={formData.address} className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base' required>
            <option value=''>Select Address</option>
            <option value='main-campus'>Main-campus Zuria</option>
            <option value='chamo-campus'>Chamo-campus Zuria</option>
            <option value='abaya-campus'>Abaya-campus Zuria</option>
            <option value='nechsar-campus'>NechSar-campus Zuria</option>
            <option value='kulfo-campus'>Kulfo-campus Zuria</option>
            <option value='other'>Other (specify in notes)</option>
          </select>
        </div>

        <div>
          <label className='block mb-2 font-semibold text-sm sm:text-base'>Order Notes (optional)</label>
          <textarea onChange={onChangeHandler} name='notes' value={formData.notes} rows='3' className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base resize-none' placeholder='Any special instructions or notes for your order...'></textarea>
        </div>
      </div>

      {/* Right Side */}
      <div className='mt-8 w-full max-w-xl'>

        <div className='mt-8 min-w-80 space-y-2 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800'>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{Number(cartTotal||0).toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <p>Delivery Fee</p>
            <p>{currency}{Number(computedDeliveryFee||0).toFixed(2)}</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency}{Number(grandTotal||0).toFixed(2)}</b>
          </div>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'> 
            <button type='button' onClick={()=>setMethod('cbe')} className={`flex items-center justify-center gap-3 border rounded-lg p-3 cursor-pointer transition shadow-sm hover:shadow ${method==='cbe' ? 'border-green-500 ring-2 ring-green-300' : 'border-gray-300 dark:border-gray-700'}`}>
              <span className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cbe' ? 'bg-green-400' : ''}`}></span>
              <img className='h-6' src={assets.cbe_logo} alt="CBE" />
              <span className='font-semibold'>CBE Mobile Banking</span>
            </button>
            <button type='button' onClick={()=>setMethod('telebirr')} className={`flex items-center justify-center gap-3 border rounded-lg p-3 cursor-pointer transition shadow-sm hover:shadow ${method==='telebirr' ? 'border-green-500 ring-2 ring-green-300' : 'border-gray-300 dark:border-gray-700'}`}>
              <span className={`min-w-3.5 h-3.5 border rounded-full ${method === 'telebirr' ? 'bg-green-400' : ''}`}></span>
              <img className='h-6' src={assets.telebirr_logo} alt="Telebirr" />
              <span className='font-semibold'>Telebirr</span>
            </button>
          </div>

          {/* Dynamic account details & proof upload */}
          <div className='mt-5 space-y-4'>
            <div className='rounded-lg p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700'>
              <p className='font-extrabold text-yellow-900 dark:text-yellow-100'>Fast verification: Upload your payment screenshot for proceeding!</p>
            </div>

            <div className='p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm'>
              {method === 'cbe' ? (
                <div>
                  <p><span className='font-semibold'>CBE Account:</span> 1000131359024</p>
                  <p><span className='font-semibold'>Account Name:</span> Misiker Genene</p>
                </div>
              ) : (
                <div>
                  <p><span className='font-semibold'>Telebirr Number:</span> 0944037042</p>
                  <p><span className='font-semibold'>Name:</span> Misikir</p>
                </div>
              )}
            </div>

            <div>
              <label className='block mb-2 font-semibold text-sm sm:text-base'>Upload Payment Screenshot</label>
              <input onChange={onChangeHandler} name='screenshot' type='file' accept='image/*' required className='w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100' />
              <p className='text-xs text-gray-500 mt-1'>Accepted formats: JPG, PNG. Max 5MB.</p>
            </div>

            <div className='text-sm font-bold text-gray-600 dark:text-gray-400 space-y-1'>
              <p>• Use your real phone/name while paying so we can verify.</p>
              <p className='text-green-700'>  ለማረጋገጥ እንዲያመቸን ትክክለኛ ማስረጃ ተጠቅመው ይክፈሉ.</p>
              <p>• Keep your transaction ID and screenshot until delivery.</p>
              <p className='text-green-700'>  ያዘዙት ስቲከር በእጅዎ እስኪደርስዎት ድረስ የክፍያ መረጃዉን አያጥፉት.</p>
              <p>• Orders without valid proof may be delayed or rejected.</p>
              <p className='text-green-700'>  ትክክለኛ ያልሆነ መረጃ ከሆነ ያስገቡት ትዕዛዙን አንቀበልም.</p>
              <p>• We will send you a confirmation message after payment verification.</p>
              <p className='text-green-700'>  መረጃዎት ትክክለኛ መሆኑን እንዳረጋገጥን መልዕክት እንልክልዎታለን.</p>
            </div>

            <label className='flex items-center gap-2 text-sm'>
              <input checked={formData.agree} onChange={onChangeHandler} name='agree' type='checkbox' className='rounded border-gray-300 focus:ring-purple-500' />
              I confirm I paid and the details are correct.
            </label>
          </div>

          <div className='w-full flex justify-end gap-3 mt-8'>
              <button type='submit' disabled={submitting || !formData.agree || !formData.screenshot || !isValidName || !isValidPhone} className={`px-6 py-3 text-sm text-white ${(!formData.agree || !formData.screenshot || !isValidName || !isValidPhone || submitting) ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900'}`}>
                {submitting ? 'PROCESSING...' : 'PLACE ORDER'}
              </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

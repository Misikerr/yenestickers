import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'; 
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Loader from '../components/Loader';

const Product = () => {

  const { productId } = useParams();
  const {products, currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] = useState('')

  const fetchProductData = useCallback(async () => {

    products.map((item)=>{
      if (item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }, [productId, products])

  useEffect(()=>{
    fetchProductData();
  },[fetchProductData])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>

          {/* Product Info */}
          <div>
            <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-600 dark:text-gray-300 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>{productData.subCategory === 'LaptopSkin' ? 'Select Laptop Size' : 'Select Size'}</p>
              <div className='flex gap-2'>
                {(productData.subCategory === 'LaptopSkin' ? ['13"','14"','15"'] : productData.sizes).map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 dark:bg-slate-800 dark:text-gray-100 dark:border-gray-700 ${item === size ? 'ring-2 ring-primary-600 border-primary-600' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black dark:bg-primary-600 text-white px-8 py-3 text-sm active:bg-gray-700 dark:active:bg-primary-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>With Free Delivery in main campus.</p>
              <p>Durable and water resistant.</p>
            </div>
          </div>
        </div>

      </div>

        {/* Display Related Products */}

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} /> 
    </div>
  ) : <Loader label='Loading product...' />
}

export default Product
import React, {  useContext, useEffect, useState, useCallback } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Loader from '../components/Loader';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products , search , showSearch, loadingProducts} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(25);

  const toggleCategory = (e) =>{
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory([]);
    } else {
      setCategory([value]);
    }
  }


  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if (showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }


    // Sort newest first (by date desc) so newly added items appear first
    productsCopy.sort((a,b)=> (b?.date || 0) - (a?.date || 0));
    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category]);


  useEffect(()=>{
    applyFilter();
    setVisibleCount(25);
  },[applyFilter]);



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-y-2 gap-x-4 text-sm font-light text-gray-700 dark:text-gray-400'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'LaptopSkin'} onChange={toggleCategory} /> Laptop Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Meme'} onChange={toggleCategory} /> Meme & Humor
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Anime'} onChange={toggleCategory} /> Anime & Manga
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cartoon'} onChange={toggleCategory} /> Cartoon
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Animal'} onChange={toggleCategory} /> Animal & Pets
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Tech'} onChange={toggleCategory} /> Tech & Coding
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Gaming'} onChange={toggleCategory} /> Gaming
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Nature'} onChange={toggleCategory} /> Nature
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Food'} onChange={toggleCategory} /> Food
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sports'} onChange={toggleCategory} /> Sports & Fitness
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Art'} onChange={toggleCategory} /> Art
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Fashion'} onChange={toggleCategory} /> Fashion & Style
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Architecture'} onChange={toggleCategory} /> Architecture & Design
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Abstract'} onChange={toggleCategory} /> Abstract & Minimalist
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Other'} onChange={toggleCategory} /> Other
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 text-gray-600'>
        {/* Loading */}
        {loadingProducts && <Loader label='Loading products...' />}
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 dark:text-gray-500'>
          {
            filterProducts.slice(0, visibleCount).map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))       
          }
        </div>
        {
          filterProducts.length > visibleCount && (
            <div className='flex justify-center mt-8 mb-4'>
              <button
                onClick={() => setVisibleCount(prev => prev + 25)}
                className='px-6 py-3 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200'
              >
                Show More Products ({Math.min(25, filterProducts.length - visibleCount)} more)
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Collection

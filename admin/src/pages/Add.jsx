import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {  backendUrl  } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {


    const [image1,setImage1] = useState(false)
    const [image2,setImage2] = useState(false)
    const [image3,setImage3] = useState(false)
    const [image4,setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Anime");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true)
            const formData = new FormData()

            formData.append("name",name)
            formData.append("description",description)
            formData.append("category",category)
            
            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
            if (response.data.success) {
                    toast.success(response.data.message);
                    setName('')
                    setDescription('')
                    setImage1(false)
                    setImage2(false)
                    setImage3(false)
                    setImage4(false)
                  } else {
                    toast.error(response.data.message)
                  }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2 text-slate-500'>Upload Image</p>

            <div className='flex gap-2 '>
                <label htmlFor="image1">
                    <img className='w-20 cursor-pointer text-slate-500' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
                </label>
            </div>
        </div>

        <div className='w-full'>
            <p className='mb-2 text-slate-500'>Product name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] text-slate-500 px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
            <p className='mb-2 text-slate-500'>Product description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full text-slate-500 max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
                <p className='mb-2 text-slate-500'>Product category</p>
                <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 text-slate-500 py-2 cursor-pointer'>
                    <option value="LaptopSkin">Laptop Skin</option>
                    <option value="Meme">Meme & Humor</option>
                    <option value="Anime">Anime & Manga</option>
                    <option value="Cartoon">Cartoon</option>
                    <option value="Animal">Animal & Pets</option>
                    <option value="Tech">Tech & Coding</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Nature">Nature</option>
                    <option value="Food">Food</option>
                    <option value="Sports">Sports & Fitness</option>
                    <option value="Art">Art</option>
                    <option value="Fashion">Fashion & Style</option>
                    <option value="Architecture">Architecture & Design</option>
                    <option value="Abstract">Abstract & Minimalist</option>
                    <option value="Other">Other</option>
                </select>
            </div>


        </div>


        <button type="submit" disabled={isSubmitting} className={`w-32 py-3 mt-4 text-white ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}`}>
            {isSubmitting ? 'Processing…' : 'ADD'}
        </button>

    </form>
  )
}

export default Add
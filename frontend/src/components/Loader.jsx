import React from 'react'

const Loader = ({label = 'Loading...'}) => {
  return (
    <div className='w-full py-16 flex flex-col items-center justify-center text-gray-500'>
      <div className='h-8 w-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin'></div>
      <p className='mt-3 text-sm'>{label}</p>
    </div>
  )
}

export default Loader



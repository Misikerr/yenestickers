import React from 'react'

const DeliveryInfo = () => {
  return (
    <section className='my-10'>
      <div className='rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-900 border border-primary-50/80'>
        <h3 className='text-2xl font-bold flex items-center gap-3'>
          <span>🚚</span>
          <span>Delivery Information</span>
        </h3>
        <p>We offer fast and reliable shipping to all locations at Arbaminch:</p>
        <ul className='mt-5 space-y-3 text-gray-700 dark:text-primary-50'>
          <li>🎁 Free delivery around main campus on orders over 300 ብር.</li>
          <li>🚛 Standard delivery: Anywhere at Arba Minch (5–9 days).</li>
          <li>⚡ Express delivery: Anywhere at Arba Minch (1–4 days).</li>
          <li>🏃 Pickup: Your stickers are chillin' here,come pick them from the main campus before they get too comfortable.🥳</li>
          <li>📍 We deliver to all campus dorms and classrooms except the girls' dorm our drivers heard 
          rumors and are too scared to check it out 👻.</li>
        </ul>
      </div>
    </section>
  )
}

export default DeliveryInfo



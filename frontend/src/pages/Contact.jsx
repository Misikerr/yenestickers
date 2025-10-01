import React, { useRef, useState } from 'react'
import { FiPhone, FiMapPin } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'

const Contact = () => {
  const formRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const formData = new FormData(form)
    const response = await fetch('https://formspree.io/f/myzplkvk', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    if (response.ok) {
      form.reset()
      setSubmitted(true)
    } else {
      alert('Oops! Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-12">
            
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="_replyto"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
                {submitted && (
                  <p className="text-green-600 text-sm" id="successMessage">Thanks! Your message has been sent.</p>
                )}
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <div className="space-y-4 text-gray-600">
                  <p className='flex items-center gap-2'>
                    <FaTelegramPlane className='text-blue-500' />
                    <a href="https://t.me/YeneStickerGuy" target="_blank">YeneStickerGuy</a>
                  </p>
                  <p className='flex items-center gap-2'>
                    <FiPhone className='text-emerald-500' />
                    +251944037042
                  </p>
                  <p className='flex items-center gap-2'>
                    <FiMapPin className='text-blue-500' />
                    Arbaminch University main campus
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Sunday: 12:00 AM - 11:59 PM</p>
                  <p className="text-xl font-bold ">We take orders 24/7!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  )
}

export default Contact
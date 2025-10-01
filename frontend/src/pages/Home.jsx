import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import HowToOrder from '../components/HowToOrder'
import DiscountBanner from '../components/DiscountBanner'
import DeliveryInfo from '../components/DeliveryInfo'
import PricingCards from '../components/PricingCards'

const Home = () => {
  return (
    <div>
      <Hero />
      <div id='after-hero'></div>
      <HowToOrder />
      <PricingCards />
      <DiscountBanner />
      <DeliveryInfo />
      <OurPolicy />
    </div>
  )
}

export default Home
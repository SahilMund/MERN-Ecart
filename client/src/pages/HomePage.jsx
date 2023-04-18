import React from 'react'
import { BestDeal, Categories, FeaturedProduct, Footer, Header, Hero } from '../components'


const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero/>
        <Categories/>
        <FeaturedProduct/>
        <Footer/>
        
    </div>
  )
}

export default HomePage
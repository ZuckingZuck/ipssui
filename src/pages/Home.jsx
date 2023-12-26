import React from 'react'
import Banner from '../components/Home/Banner'
import Services from '../components/Home/Services'
import Blog from '../components/Home/Blog'
//import Partners from '../components/Home/Partners'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Applications from '../components/Home/Applications'
const Home = () => {
  useDocumentTitle("IPSS - Ana Sayfa")

  return (
    <div className='container mx-auto'>
        <Banner />
        <Services />
        <Applications />
        <Blog />
    </div>
  )
}

export default Home
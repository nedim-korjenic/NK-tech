import React from 'react'

import {client} from '../lib/client'
import { useStateContext } from '../context/StateContext'
import {Product, FooterBanner, HeroBanner} from '../components'

const Home = ({products, bannerData}) => {
  const {isDarkMode} = useStateContext()
  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      {console.log(bannerData)}
    <div className={isDarkMode?'products-heading-dark' : 'products-heading'}>
      <h2>Best selling products</h2>
      <p>Top tech products at great price</p>
    </div>
    <div className='products-container'>
      {products?.map((product)=> <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner = {bannerData && bannerData[0]}/>
    </div>
)
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home
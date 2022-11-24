import React from 'react'
import Link from 'next/link'
import { useStateContext } from '../context/StateContext'

import { urlFor } from '../lib/client'

const Product = ({product: {image, name, slug, price}}) => {
  const {isDarkMode} = useStateContext()
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={isDarkMode?'product-card-dark':'product-card'}>
          <img src={urlFor(image && image[0])} width={250} height={250} style={{objectFit:'contain'}} className="product-image"/>
          <p className='product-name'>{name}</p>
          <p className={isDarkMode?'product-price-dark':'product-price'}>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
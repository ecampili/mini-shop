import type { NextPage } from 'next'
import { IProduct } from '../interfaces'

import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'




const Home: NextPage = () => {
  return (
 <ShopLayout
  title={'Mini-Shop - Home'} 
  pageDescription={'Encuentra los mejores productos'}
  imageFullUrl={''} 
  >
      <Typography variant= 'h1' component ='h1'>Tienda</Typography>
      <Typography variant= 'h2' sx={{ marginBottom :1}}>Todos los productos</Typography>
     
      <ProductList products={initialData.products as any}/>

 </ShopLayout>
  )
}

export default Home

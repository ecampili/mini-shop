import type { NextPage } from 'next'
import { IProduct } from '../interfaces'

import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/seed-data.ts'
import { useProducts } from '../hooks'
import {FullScreenLoading} from '../components/ui'




const HomePage: NextPage = () => {

 

  const {products, isLoading, isError} = useProducts('/products')  


  

  return (
 <ShopLayout
  title={'Mini-Shop - Home'} 
  pageDescription={'Encuentra los mejores productos'}
  imageFullUrl={''} 
  >
      <Typography variant= 'h1' component ='h1'>Tienda</Typography>
      <Typography variant= 'h2' sx={{ marginBottom :1}}>Todos los productos</Typography>

    {
      isLoading 
      ? <FullScreenLoading/>
      : <ProductList products={products}/>
    }

     
     

 </ShopLayout>
  )
}

export default HomePage

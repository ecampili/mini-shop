import type { NextPage } from 'next'
import { IProduct } from '../../interfaces'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { initialData } from '../../database/products'
import { useProducts } from '../../hooks'
import {FullScreenLoading} from '../../components/ui'



const WomenPage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=women')  
  

  return (
 <ShopLayout
  title={'Mini-Shop - Mujeres'} 
  pageDescription={'Encuentra los mejores productos para mujeres'}
  imageFullUrl={''} 
  >
      <Typography variant= 'h1' component ='h1'>Tienda Mujeres</Typography>
      <Typography variant= 'h2' sx={{ marginBottom :1}}>Todos los productos para Mujeres</Typography>

    {
      isLoading 
      ? <FullScreenLoading/>
      : <ProductList products={products}/>
    }

     
     

 </ShopLayout>
  )
}

export default WomenPage

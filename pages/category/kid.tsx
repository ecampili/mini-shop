import type { NextPage } from 'next'
import { IProduct } from '../../interfaces'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { initialData } from '../../database/products'
import { useProducts } from '../../hooks'
import {FullScreenLoading} from '../../components/ui'



const Kidpage: NextPage = () => {

  const {products, isLoading, isError} = useProducts('/products?gender=kid')  
  

  return (
 <ShopLayout
  title={'Mini-Shop - Kids'} 
  pageDescription={'Encuentra los mejores productos para niños'}
  imageFullUrl={''} 
  >
      <Typography variant= 'h1' component ='h1'>Tienda Niños</Typography>
      <Typography variant= 'h2' sx={{ marginBottom :1}}>Todos los productos para niños</Typography>

    {
      isLoading 
      ? <FullScreenLoading/>
      : <ProductList products={products}/>
    }

     
     

 </ShopLayout>
  )
}

export default Kidpage

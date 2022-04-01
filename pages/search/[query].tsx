import type { NextPage,GetServerSideProps, } from 'next'
import { IProduct } from '../../interfaces'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { initialData } from '../../database/products'
import { useProducts } from '../../hooks'
import {FullScreenLoading} from '../../components/ui'

import { dbProducts } from '../../database'
// import { useRouter } from 'next/router'
import Product from '../../models/Product';
import { Box } from '@mui/system'

interface Props{
    products:IProduct[]
    query:string
    foundProducts:boolean
}

const SearchPage: NextPage<Props> = ({products,query,foundProducts}) => {

//     const router = useRouter()
//    const term = router.query.query

//   const {products, isLoading, isError} = useProducts(`/products/search/${term}`)  
  

  return (
 <ShopLayout
  title={'Mini-Shop - Search'} 
  pageDescription={'Encuentra los mejores productos'}
  imageFullUrl={''} 
  >
      <Typography variant= 'h1' component ='h1'>Buscar producto</Typography>

      {
          foundProducts 
          ?   <Typography variant= 'h2' sx={{ marginBottom :1}} textTransform='capitalize'>{`Término: ${query}`}</Typography>
          : (
              <Box display='flex' sx={{mb:2}}>
              <Typography variant= 'h2' sx={{ mt :1}}>No se encontró ningun producto </Typography>
              <Typography variant= 'h2' sx={{ mt:1 , ml:1, }} textTransform='capitalize' color="secondary">{query}</Typography>
              </Box>
          )
      }
    

    {/* {
      isLoading 
      ? <FullScreenLoading/>
      : <ProductList products={products}/>
    } */}

    <ProductList products={products}/>
     

 </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
   
    const {query=''} = params as {query:string};

    if(query.length === 0){
        return{
            redirect:{
                destination:'/',
                permanent:true

            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0 ;

    // TODO: si no encuentra mostrar sugerencias
    if(!foundProducts){
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            query,
            foundProducts
        }
    }
}

export default SearchPage

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideShow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/products';
import { SizeSelector } from '../../components/products/SizeSelector';
import { IProduct } from '../../interfaces';
import { NextPage , GetStaticProps, GetStaticPaths} from 'next';
import { Product } from '../../models';
import { dbProducts } from '../../database';
// import { useRouter } from 'next/router';
// import { useProducts } from '../../hooks/useProducts';

interface Props{
  product:IProduct
}



const ProductPage:NextPage<Props> = ({product}) => {

  // const router = useRouter()
  // const{products:product ,isLoading} = useProducts(`/products/${router.query.slug}`);

  // if(isLoading){
  //   return (<h1>Cragando ....</h1>)
  // }
  
  return (
   <ShopLayout title={product.title} pageDescription={product.description}>
     <Grid container spacing={3}>
       <Grid item xs={12} sm={7}>
         {/* slideShow */}
         <ProductSlideShow images={product.images}/>
       </Grid>
       <Grid item xs={12} sm={5}>
         <Box display='flex' flexDirection='column'>

           {/* titulos */}
           <Typography variant='h1' component='h1'>{product.title}</Typography>
           <Typography variant='subtitle1' component='h2'>{`$ ${product.price}`}</Typography>

           {/* Cantidad */}
           <Box sx={{my:2}}>
             <Typography variant='subtitle2'>Cantidad</Typography>
             {/* ItemCouter */}
              <ItemCounter/>
              <SizeSelector sizes={product.sizes}              />
           </Box>

          

           {/* Agregar al carrito */}

           <Button color='secondary' className='circular-btn'>
             Agregar al carrito
           </Button>
           {/* <Chip label="No hay disponibles" color="error" variant= "outlined"/> */}

           {/* Description */}
           <Box sx={{mt:3}}>
             <Typography variant ='subtitle2'>Descripción</Typography>
             <Typography variant ='body2'>{product.description}</Typography>
           </Box>
          
         </Box>

       </Grid>
     </Grid>

   </ShopLayout>
  )
}

//no usar esto
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const { slug='' } = params as {slug:string} 
//   const product = await dbProducts.getProductBySlug(slug)

//   if(!product){
//     return{
//       redirect:{
//         destination:'/',
//         permanent:false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// getStaticPaths....
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}


// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
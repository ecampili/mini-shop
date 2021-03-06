import { Box, Card, CardActionArea, CardMedia, Grid, Typography,Link, Chip } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { IProduct } from '../../interfaces'
import NextLink from 'next/link';

interface Props{
    product:IProduct
}

export const ProductCard:FC<Props> = ({product}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

   const productImage =  useMemo(() => {
        return isHovered
        ? `/products/${product.images[1]}`
        : `/products/${product.images[0]}`
    }, [isHovered, product.images])


  return (
   <Grid item
    xs={6}
    sm={4}
    onMouseLeave={()=>setIsHovered(false)}
    onMouseEnter={()=>setIsHovered(true)}
   >
      <Card>
              <NextLink href={`/product/${product.slug}`} passHref prefetch={ false }>
                <Link>
                   
                    <CardActionArea>
                       
                        <CardMedia 
                            component='img'
                            className='fadeIn'
                            image={ productImage }
                            alt={ product.title }
                            onLoad={()=> setIsImageLoaded(true)}
                        />
                       {
                           (product.inStock < 1)
                           ?  (<Chip 
                           color='primary' 
                           label='No disponible'
                           sx={{position:'absolute', zIndeX: 99, top:'10px',left:'10px'}}
                           />)
                           :null
                       }
                    </CardActionArea>
                </Link>
              </NextLink>
              
          </Card>

        <Box sx={{mt:1}} display={isImageLoaded ? 'block' : 'none'} className='fadeIn'>
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>{`$${product.price}`}</Typography>
        </Box>
      </Grid>
  )
}

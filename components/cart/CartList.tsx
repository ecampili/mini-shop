import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { FC, useContext } from 'react'

import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

import {currency} from '../../utils'




interface Props{
    editable?:boolean
}


export const CartList:FC<Props> = ({editable=false}) => {

const {cart,updateCartQuantity,removeProductFromCart} = useContext(CartContext)

const onNewCartQuantity =(product:ICartProduct,newQuantityValue:number)=>{
    product.quantity = newQuantityValue
    updateCartQuantity(product)
}

  return (
    <>
        {
            cart.map(product =>(
                <Grid container  spacing={2} sx={{mb:1}} key={product.slug+product.size}>
                    <Grid item xs={3}>
                        {/* TODO:llevar a la pagina del producto */}
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.image}`}
                                        component='img'
                                        sx={{borderRadius:'5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column' justifyContent='center'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'>Talla:<strong>{product.size}</strong></Typography>

                            {/* Condicional */}

                            {
                                editable
                                ?<ItemCounter 
                                    currentValue={product.quantity} 
                                    maxValue={5} 
                                    updatedQuantity={(value)=>{onNewCartQuantity(product,value)}}/>
                                :<Typography variant='h6'>{product.quantity} {product.quantity >1 ? 'Productos' : 'Producto'}</Typography>
                            }


                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
                        <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                        {/* Editable */}

                        {
                            editable && (<Button variant='text' color='secondary'
                                onClick={()=>removeProductFromCart(product)}
                            >
                                         Remover
                                         </Button>
                                        )
                                
                        }
                       
                    </Grid>

                </Grid>
            ))
        }
    </>
  )
}




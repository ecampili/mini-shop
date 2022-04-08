import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React, { FC, useContext } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import NextLink from 'next/link';

import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context';


interface Props{

}

const SummaryPage:FC<Props> = () => {

  const{shippingAddress,numberOfItems}=useContext(CartContext)



  return (
   <ShopLayout title='Resumen de compra' pageDescription='Resumen de la orden'>
       <Typography variant='h1' component ='h1'>Resumen de la orden</Typography>
       <Grid container sx={{mt:5}}>
           <Grid item xs={12} sm={7}>
            {/* cartList */}
          <CartList />
           </Grid>
           <Grid item xs={12} sm={5}>
             <Card className='summary-card'>
               <CardContent>
                 <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems>1 ?'productos':'producto'})</Typography>
                 <Divider sx={{my:1}}/>

                 <Box display='flex' justifyContent='space-between'>
                 <Typography variant='subtitle1'>Dirección de entrega</Typography>
                    <NextLink href='/checkout/address' passHref>
                        <Link underline='always' color='secondary'>
                            Editar
                        </Link>
                    </NextLink>
                 </Box>
                 <Typography >{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
                 <Typography >{shippingAddress?.address}</Typography>
                 <Typography >{shippingAddress?.address2}</Typography>
                 <Typography >{shippingAddress?.city}, {shippingAddress?.zip}</Typography>
                 <Typography >{shippingAddress?.country}</Typography>
                 <Typography >Tel: {shippingAddress?.phone}</Typography>

                 <Divider sx={{my:1}}/>
      
                 <Box display='flex' justifyContent='end'>
                    <NextLink href='/cart' passHref>
                        <Link underline='always' color='secondary'>
                            Editar
                        </Link>
                    </NextLink>
                 </Box>
                 <OrderSummary/>

                 <Box sx={{mt:3}}>
                  <Button color='secondary' className='circular-btn' fullWidth>Confirmar Orden</Button>
                 </Box>

               </CardContent>
             </Card>
              
            </Grid>
       </Grid>
   </ShopLayout>
  )
}

export default SummaryPage
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React, { FC } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import NextLink from 'next/link';

import { ShopLayout } from '../../components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

interface Props{
    id:string
}

const OrderPage:FC<Props> = () => {
  return (
   <ShopLayout title='Resumen de la orden abc123' pageDescription='Resumen de la orden'>
       <Typography variant='h1' component ='h1'>Orden:ABC123</Typography>

       {/* <Chip 
       sx={{my:2}}
       label='Pendiente de pago'
       variant='outlined'
       color='error'
       icon={<CreditCardOffOutlined/>}
       /> */}

        <Chip 
            sx={{my:2}}
            label='Orden ya fue pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined/>}
        />

       <Grid container sx={{mt:5}}>
           <Grid item xs={12} sm={7}>
           
          <CartList />
           </Grid>
           <Grid item xs={12} sm={5}>
             <Card className='summary-card'>
               <CardContent>
                 <Typography variant='h2'>Resumen (3 productos)</Typography>
                 <Divider sx={{my:1}}/>

                 <Box display='flex' justifyContent='space-between'>
                 <Typography variant='subtitle1'>Dirección de entrega</Typography>
                    <NextLink href='/checkout/address' passHref>
                        <Link underline='always' color='secondary'>
                            Editar
                        </Link>
                    </NextLink>
                 </Box>
                 <Typography >Eduardo Campili</Typography>
                 <Typography >Algún lugar</Typography>
                 <Typography >Buenos Aires, cp1234</Typography>
                 <Typography >Argentina</Typography>
                 <Typography >+054 1168983242</Typography>

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
                    {/* <Button color='secondary' className='circular-btn' fullWidth> */}
                     <h1>Pagar</h1>
                     <Chip 
                        sx={{my:2}}
                        label='Orden ya fue pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined/>}
                    />
                    {/* </Button> */}
                 </Box>

               </CardContent>
             </Card>
              
            </Grid>
       </Grid>
   </ShopLayout>
  )
}

export default OrderPage
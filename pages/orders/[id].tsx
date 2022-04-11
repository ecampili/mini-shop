import React, { FC } from 'react'

import { GetServerSideProps } from 'next'
import NextLink from 'next/link';

import { ShopLayout } from '../../components/layouts'
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, Data, OrderSummary } from '../../components/cart'
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';



interface Props{
    order:IOrder;
}

const OrderPage:FC<Props> = ({order}) => {
 
 const {isPaid,numberOfItems,orderItems,_id,subTotal,tax,total,shippingAddress} = order;
 const {firstName,lastName,address,address2,city,zip,country,phone} = shippingAddress

 const orderValues ={
     numberOfItems,
     subTotal,
     tax,
     total
 }
 
    return (
   <ShopLayout title={`Resumen de la órden ${_id}`} pageDescription='Resumen de la orden'>
       <Typography variant='h1' component ='h1'>{`Orden: ${_id}`}</Typography>

       {/* <Chip 
       sx={{my:2}}
       label='Pendiente de pago'
       variant='outlined'
       color='error'
       icon={<CreditCardOffOutlined/>}
       /> */}

        <Chip 
            sx={{my:2}}
            label={isPaid ? 'Orden ya fue pagada':'Orden impaga'}
            variant='outlined'
            color={isPaid ? 'success':'error'}
            icon={<CreditScoreOutlined/>}
        />

       <Grid container sx={{mt:5}} className='fadeIn'>
           <Grid item xs={12} sm={7}>
           
          <CartList  products={orderItems}/>

           </Grid>
           <Grid item xs={12} sm={5}>
             <Card className='summary-card'>
               <CardContent>
                 <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems ===1 ?'producto' : 'productos'})</Typography>
                 <Divider sx={{my:1}}/>

                 <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Dirección de entrega</Typography>                   
                 </Box>
                 <Typography >{firstName} {lastName}</Typography>
                 <Typography >{address} {address2 ?`, ${address2}`:''}</Typography>
                 <Typography >{city}, {zip}</Typography>
                 <Typography >{country}</Typography>
                 <Typography >{phone}</Typography>

                 <Divider sx={{my:1}}/>

                 
                 <OrderSummary orderValues={orderValues} />

                 <Box sx={{mt:3}} display='flex' flexDirection='column'>
                    {/* <Button color='secondary' className='circular-btn' fullWidth> */}
                    { 
                        order.isPaid                    
                        ?(<Chip 
                            sx={{my:2}}
                            label='Orden ya fue pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined/>}
                        />)
                        :
                        <>
                        <h1>Pagar</h1>
                        <Button color='secondary' className='circular-btn' fullWidth> 
                            Pagar
                        </Button>
                        </>
                        
                
                }
                   
                 </Box>

               </CardContent>
             </Card>
              
            </Grid>
       </Grid>
   </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
  
    const {id=''} = query
    const session:any = await getSession({req})


    if(!session){
        return{
            redirect:{
                destination:`/auth/login?page=/orders/${id}`,
                permanent:false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString())
    if(!order){
        return {
            redirect:{
                destination:'/orders/history',
                permanent:false,
            }
        }
    }

    if(order.user !== session.user._id){
        return {
            redirect:{
                destination:'/orders/history',
                permanent:false,
            }
        }
    }



    return {
        props: {
            order
        }
    }
}

export default OrderPage
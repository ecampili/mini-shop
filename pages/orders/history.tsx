import { Chip, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { DataGrid ,GridColDef,GridValueGetterParams} from '@mui/x-data-grid';
import NextLink from 'next/link';
import { GetStaticProps, NextPage } from 'next'
import miniShopApi from '../../api/miniShopApi';

const columns :GridColDef[] =[
    {field:'id',headerName:'ID',width:100},
    {field:'fullName',headerName:'Nombre Completo',width:300},   
    {
        field:'paid',
        headerName:'Pagado',
        description:'Muestra si la orden esta pagada o no',
        width:200,
        renderCell:(params:GridValueGetterParams)=>{
            return(
                params.row.paid 
                ? <Chip label='Pagado' color='success' variant='outlined'/> 
                : <Chip label='No Pagada' color='error' variant='outlined'/>
            )
        }
    },
    {
        field:'orderNumber',
        headerName:'Ver Orden',       
        width:200,
        sortable:false,
        renderCell:(params:GridValueGetterParams)=>{
            return(
               <NextLink href={`/orders/${params.row.orderId}` } passHref>
                   <Link underline='always' color='secondary'>
                    <Typography>Ver orden</Typography>
                   </Link>
               </NextLink>
            )
        }
    }
]


interface Props {
    orders: IOrder[];
}

const HistoryPage :NextPage<Props>= ({orders}) => {

   const rows= orders.map((order,index)=>{
       return{
         id:index+1,
         fullName:order.shippingAddress.firstName +' '+order.shippingAddress.lastName,        
         paid:order.isPaid,
         orderId: order._id
       }
   })
    
  return (
  <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
      <Typography variant='h1' component='h1'>
          Historial de ordenes
      </Typography>

      { 
      rows.length === 0 
      ?<HistoryEmpty/>
     
      :<Grid container className='fadeIn'>
          <Grid item xs={12} sx={{height:650,width:'100%'}}>
            <DataGrid 
                columns={columns} 
                rows={rows} 
                pageSize={10}
                rowsPerPageOptions={[10]}
                />

               
          </Grid>
      </Grid>
}
  </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { IOrder } from '../../interfaces/order';
import { getSession } from 'next-auth/react';

import { dbOrders } from '../../database';
import { HistoryEmpty } from '../../components/orders';

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const session:any =  await getSession({req})

    if(!session){
       return {
        redirect:{
            destination: '/auth/login?page=orders/history',
            permanent:false
        }
       }
    }

    const orders = await  dbOrders.getOrdersByUserId(session.user._id)

    
 
    return {
        props: {
        orders 
        }
    }
}

export default HistoryPage
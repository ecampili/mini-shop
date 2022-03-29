import { Chip, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { DataGrid ,GridColDef,GridValueGetterParams} from '@mui/x-data-grid';
import NextLink from 'next/link';

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
               <NextLink href={`/orders/${params.row.id}` } passHref>
                   <Link underline='always' color='secondary'>
                    <Typography>Ver orden</Typography>
                   </Link>
               </NextLink>
            )
        }
    }
]

const rows =[
    {id:2,paid: false, fullName:'Angeles Campili', orderNumber:'abc'},
    {id:3,paid: true, fullName:'Florencia Campili', orderNumber:'abd'},
    {id:1,paid: true, fullName:'Eduardo Campili', orderNumber:'abd'},
    {id:4,paid: true, fullName:'Pedro Campili', orderNumber:'abe'},
    {id:5,paid: true, fullName:'Florencia Bendersky', orderNumber:'abf'},
    {id:6,paid: true, fullName:'Julian Portaluppi', orderNumber:'abg'},
]

const HistoryPage = () => {
  return (
  <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
      <Typography variant='h1' component='h1'>
          Historial de ordenes
      </Typography>

      <Grid container>
          <Grid item xs={12} sx={{height:650,width:'100%'}}>
            <DataGrid 
                columns={columns} 
                rows={rows} 
                pageSize={10}
                rowsPerPageOptions={[10]}
                />

               
          </Grid>
      </Grid>
  </ShopLayout>
  )
}

export default HistoryPage
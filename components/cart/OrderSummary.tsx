import { Divider, Grid, Typography } from "@mui/material"
import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { currency} from '../../utils'
import { NextPage } from 'next';



 interface Props{
   orderValues?:{
    subTotal:number;
    tax:number;
    total:number;
    numberOfItems:number
    }
 }


export const OrderSummary:FC<Props> = ({orderValues}) => {
    const {total,subTotal,tax,numberOfItems} = useContext(CartContext)

    const summaryValues = orderValues ? orderValues : {total,subTotal,tax,numberOfItems}

 

    

  return (
   <Grid container>
       <Grid item xs={6}>
           <Typography>No. productos</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems === 1 ? 'item':'items'}</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Sub Total</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{currency.format(summaryValues.subTotal)}</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Inpuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{currency.format(summaryValues.tax)}</Typography>
       </Grid>
        <Divider/>
       <Grid item xs={6} sx={{mt:2}}>
           <Typography variant='subtitle1'>Total:</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
           <Typography variant='subtitle1'>{currency.format(summaryValues.total)}  </Typography>
       </Grid>
   </Grid>
  )
}

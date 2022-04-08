import { Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency} from '../../utils'




export const OrderSummary = () => {
    const {total,subTotal,tax,numberOfItems} = useContext(CartContext)

  return (
   <Grid container>
       <Grid item xs={6}>
           <Typography>No. productos</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{numberOfItems} {numberOfItems === 1 ? 'item':'items'}</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Sub Total</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{currency.format(subTotal)}</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Inpuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{currency.format(tax)}</Typography>
       </Grid>
        <Divider/>
       <Grid item xs={6} sx={{mt:2}}>
           <Typography variant='subtitle1'>Total:</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
           <Typography variant='subtitle1'>{currency.format(total)}  </Typography>
       </Grid>
   </Grid>
  )
}

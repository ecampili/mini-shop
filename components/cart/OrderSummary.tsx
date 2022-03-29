import { Divider, Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
   <Grid container>
       <Grid item xs={6}>
           <Typography>No. productos</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>3 items</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Sub Total</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{`$${155.36}`}</Typography>
       </Grid>

       <Grid item xs={6}>
           <Typography>Inpuestos (15%)</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end'>
           <Typography>{`$${35.34}`}</Typography>
       </Grid>
        <Divider/>
       <Grid item xs={6} sx={{mt:2}}>
           <Typography variant='subtitle1'>Total:</Typography>
       </Grid>
       <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
           <Typography variant='subtitle1'>{`$${190.70}`}</Typography>
       </Grid>
   </Grid>
  )
}

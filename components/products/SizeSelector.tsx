import { Box, Button, Typography } from '@mui/material'
import React, { FC } from 'react'
import { ISize } from '../../interfaces'

interface Props{
    selectedSize?:string
    sizes:ISize[]
    onSelectedSize:(size:ISize)=>void
}

export const SizeSelector:FC<Props> = ({selectedSize,sizes,onSelectedSize}) => {


  return (
   <Box>
       Talles:
       {
           sizes.map(size=>(
               <Button 
               key={size}
               size='small'
               color={selectedSize === size ? 'primary' :'info'}
               onClick={()=>onSelectedSize(size)}
               >
                   {size}
               </Button>
           ))
       }
   </Box>
  )
}

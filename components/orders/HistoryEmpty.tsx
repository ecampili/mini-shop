import { Box, Typography } from '@mui/material';
import React from 'react'

export const HistoryEmpty = () => {
  return (
    <Box 
    display='flex' 
    justifyContent='center' 
    alignItems='center' 
    height='calc(100vh - 200px)'
    sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
>
    <Typography variant='h2'>
        No tienes ninguna orden aun
    </Typography>   
    </Box>
  )
}


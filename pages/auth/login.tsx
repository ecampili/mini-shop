import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorOutline, ErrorSharp } from '@mui/icons-material';

import { validations } from '../../utils';
import { miniShopApi } from '../../api';
import Cookie from 'js-cookie'
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData ={
    email:string,
    password:string
}

const LoginPage = () => {

    const router = useRouter()

    console.log('router',router)

    const { loginUser} = useContext(AuthContext)
  
    const { register, handleSubmit,  formState: { errors } } = useForm<FormData>();  

    const [showError, setShowError] = useState(false)


    const onLoginUser = async ({email,password}:FormData)=>{

        setShowError(false)

        const isValidLogin = await loginUser(email,password)

        if(!isValidLogin){
            setShowError(true)
            setTimeout(()=>{
                setShowError(false)
            },3000)
            return 
        }

        const destination = router.query.page?.toLocaleString() || '/'

        router.replace(destination)
     
        // al backend
        // try {
        //     const {data} = await miniShopApi.post('/user/login',{email,password})
        //     const{ token,user}=data
        //     // console.log({token,user})

        //     Cookie.set('token',token)

        // } catch (error) {
        //     setShowError(true)
        //     setTimeout(()=>{
        //         setShowError(false)
        //     },3000)
        // }
    }    
return (
   <AuthLayout title='Ingresar'> 
        <form onSubmit={handleSubmit(onLoginUser)} noValidate >
            <Box sx={{width:350, padding:'10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                            <Chip 
                            label="No reconocemos ese usuario/contraseña"
                            color='error'
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{display:showError?'flex' :'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            type='email'
                            label='Correo' 
                            variant='filled' 
                            fullWidth
                            {...register('email',{
                                required:'El email es requerido',
                                validate:(val)=>validations.isEmail(val)
                                
                            })}   
                            error={!!errors.email}    
                            helperText={errors.email?.message}           
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField  
                            type='password' 
                            label='Contraseña' 
                            variant='filled' 
                            fullWidth
                            {...register('password',{
                                required:'La contraseña es requerida',
                                minLength:{value:6,message:'Mínimo 6 caracteres'}
                            })}
                            error={!!errors.password}    
                            helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Button 
                        type='submit'
                        fullWidth 
                        color='secondary' 
                        className='circular-btn'
                        >Login</Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                        <NextLink href={router.query.page ? `/auth/register?page=${router.query.page}` : '/auth/register'} passHref >
                            <Link underline='always'>
                            No tienes cuenta?
                            </Link>
                        </NextLink>
                        </Grid>
                    </Grid>
                </Box>
        </form>

   </AuthLayout>
  )
}

export default LoginPage
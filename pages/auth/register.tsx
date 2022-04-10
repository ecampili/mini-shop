import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

//import Cookie from 'js-cookie';

import { Box, Button, Grid, Link, TextField, Typography,Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
//import { miniShopApi } from '../../api';
import { AuthContext } from '../../context';

type FormData ={
    name:string;
    email:string;
    password:string;
}

const RegisterPage = () => {

    const router = useRouter()

    const { register, handleSubmit,  formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const {registerUser} = useContext(AuthContext)

    const onRegisterForm = async({name,email,password}:FormData)=>{
        // console.log({name,email,password})

        setShowError(false)
        const {hasError,message} = await registerUser(name,email,password)

        if(hasError){          
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(()=>{
                setShowError(false)
            },3000)
            return
        }

        // const destination = router.query.page?.toLocaleString() || '/'
        // router.replace(destination)
        await signIn('credentials',{email,password});

        // try {
        //     const {data} = await miniShopApi.post('/user/register',{name, email,password})
        //     const{ token,user}=data           

        //     Cookie.set('token',token)
        // } catch (error) {
        //     console.log(error)
        //     setShowError(true)
        //     setTimeout(()=>{
        //         setShowError(false)
        //     },3000)
        // }
    }

    //console.log('router en el register',router)

  return (
   <AuthLayout title='Ingresar'> 
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate >
       <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Crear Cuenta</Typography>
                    <Chip 
                            label={errorMessage}
                            color='error'
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{display:showError?'flex' :'none'}}
                            />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    label='Nombre Completo' 
                    variant='filled' 
                    fullWidth 
                    {...register('name',{
                        required:'El Nombre es requerido',
                        minLength:{value:4,message:'Mínimo 4 caracteres'}
                    })}
                    error={!!errors.name}    
                    helperText={errors.name?.message}
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
                <Button type='submit' fullWidth color='secondary' className='circular-btn'>Registrar</Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                <NextLink href={router.query.page ? `/auth/login?page=${router.query.page}` : '/auth/login'} passHref >
                    <Link underline='always'>
                    Ya tienes cuenta?
                    </Link>
                </NextLink>
                </Grid>
            </Grid>
        </Box>
       </form>

   </AuthLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
   
    const session = await getSession({req})
    
    const {page='/'} =query; 
    if(session){
        return{
            redirect:{
                destination:page.toString(),
                permanent:false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage
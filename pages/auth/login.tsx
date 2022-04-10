import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorOutline, ErrorSharp } from '@mui/icons-material';

import { validations } from '../../utils';
// import { miniShopApi } from '../../api';
// import Cookie from 'js-cookie'
// import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { getSession, signIn ,getProviders} from 'next-auth/react';

type FormData ={
    email:string,
    password:string
}

const LoginPage = () => {

    const router = useRouter()

    // console.log('router',router)

    //const { loginUser} = useContext(AuthContext)
  
    const { register, handleSubmit,  formState: { errors } } = useForm<FormData>();  

    const [showError, setShowError] = useState(false)

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {     
    
        getProviders().then(prov=>{
            //console.log('providers',prov);
            setProviders(prov)
        })
    
    }, [])
    


    const onLoginUser = async ({email,password}:FormData)=>{

        setShowError(false)

        // const isValidLogin = await loginUser(email,password)
        // if(!isValidLogin){
        //     setShowError(true)
        //     setTimeout(()=>{setShowError(false)},3000)
        //     return 
        // }
        // const destination = router.query.page?.toLocaleString() || '/'
        // router.replace(destination)
     
        await signIn('credentials',{email,password})
        
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

                            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'   justifyContent='center'>
                                <Divider sx ={{width: '100%',mb:2}}/>
                                {
                                    //Convierte el objeto en array
                                    Object.values(providers).map((provider:any)=>{

                                        if(provider.id ==='credentials') {
                                            return null
                                        }

                                        return (
                                            <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{mb:1}}
                                            onClick={()=>signIn(provider.id)}
                                            >
                                                {provider.name}
                                            </Button>
                                        )
                                    })

                                  
                                }
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

export default LoginPage
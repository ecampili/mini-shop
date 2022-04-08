import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react"
import { AuthContext, UIContext } from "../../context"
import { useRouter } from "next/router"

import Cookies from 'js-cookie'




export const SideMenu = () => {

    const {isMenuOpen,toggleSideMenu} = useContext(UIContext)
    const {user,isLoggedIn ,logOutUser} = useContext(AuthContext)

    // console.log('user',user)
    // console.log('isLoggedIn',isLoggedIn)

    const [searchTerm, setSearchTerm] = useState('');

    const router =useRouter()

    const onSearchTerm =()=>{
        if(searchTerm.trim().length === 0) return
        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo =(url:string)=>{
        router.push(url)
        toggleSideMenu()       
    }

   

    
  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        type='text'
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        onKeyPress={(e)=>e.key === 'Enter' ? onSearchTerm() : null}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                
                                onClick={onSearchTerm}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn
                     ?(
                        <>
                        <ListItem button >
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                        </>
                    )
                    :null
                }


                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/category/men')} >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/category/women')}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/category/kid')}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/category/unisex')}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Unisex'} />
                </ListItem>

                {
                    !isLoggedIn 
                    ?(<ListItem 
                    button
                    onClick={()=>navigateTo(`/auth/login?page=${router.asPath}`)}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>)
                    :(<ListItem button onClick={logOutUser}>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>)
                }
                

            

                 {
                        user && (user.role) === 'admin' && (
                            <>
                             {/* Admin */}
                             <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                            </>
                        )
                     
                 }       
               
            </List>
        </Box>
    </Drawer>
  )
}
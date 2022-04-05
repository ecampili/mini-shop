import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { flexbox } from "@mui/system"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { CartContext, UIContext } from "../../context"


export const Navbar = () => {

    const {numberOfItems} =useContext(CartContext)

    const {asPath,push} = useRouter()

    const {toggleSideMenu} = useContext(UIContext)

    const [searchTerm, setSearchTerm] = useState('');

    const [isSearchVisible, setIsSearchVisible] = useState(false)

   
    

    const onSearchTerm =()=>{
        if(searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
        setSearchTerm('')
        setIsSearchVisible(false)
    }

   
  

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Mini |</Typography>
                    <Typography sx={{ marginLeft: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box  className='fadeIn' sx={{ display: isSearchVisible ? 'none' :{xs:'none', sm:'block'}}}>
            <NextLink href='/category/men' passHref>
                <Link>
                   <Button color={asPath === '/category/men' ?'primary':'info'}>Hombres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/women' passHref>
                <Link>
                   <Button color={asPath === '/category/women' ?'primary':'info'}>Mujeres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/kid' passHref>
                <Link>
                   <Button color={asPath === '/category/kid' ?'primary':'info'}>Niños</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/unisex' passHref>
                <Link>
                   <Button color={asPath === '/category/unisex' ?'primary':'info'}>Unisex</Button>
                </Link>
            </NextLink>
            </Box>
            <Box flex={1}/>


             {/* pantallas grandes */}
            {/* <IconButton sx={{ display:{xs:'none' ,sm:'flex'}}}>
                <SearchOutlined/>
            </IconButton> */}

            {
                isSearchVisible
                ?(
                    <Input
                    sx={{display:{xs:'none',sm:'flex'}}}
                    className='fadeIn'
                autoFocus
                type='text'
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                onKeyPress={(e)=>e.key === 'Enter' ? onSearchTerm() : null}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        
                        onClick={()=>setIsSearchVisible(false)}
                        >
                            <ClearOutlined />
                        </IconButton>
                    </InputAdornment>
                }
            />
                )
                : (
                    <IconButton 
                    sx={{ display:{xs:'none' ,sm:'flex'}}}
                    onClick={()=>setIsSearchVisible(true)}
                        className='fadein'
                    >
                <SearchOutlined/>
            </IconButton> 
                )

            }
            




             {/* pantallas pequeñas */}
            <IconButton sx={{ display:{xs:'flex' ,sm:'none'}}}onClick={toggleSideMenu}>
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                       <Badge badgeContent={numberOfItems >9 ? '+9':numberOfItems} color='secondary'>
                            <ShoppingCartOutlined/>
                       </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>Menú</Button>
        </Toolbar>
    </AppBar>
  )
}

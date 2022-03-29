import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { flexbox } from "@mui/system"
import NextLink from 'next/link'


export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Mini |</Typography>
                    <Typography sx={{ marginLeft: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box  sx={{ display:{xs:'none', sm:'block'}}}>
            <NextLink href='/category/men' passHref>
                <Link>
                   <Button>Hombres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/women' passHref>
                <Link>
                   <Button>Mujeres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/kids' passHref>
                <Link>
                   <Button>Niños</Button>
                </Link>
            </NextLink>
            </Box>
            <Box flex={1}/>
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                       <Badge badgeContent={1} color='secondary'>
                            <ShoppingCartOutlined/>
                       </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>Menú</Button>
        </Toolbar>
    </AppBar>
  )
}
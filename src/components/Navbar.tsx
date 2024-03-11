import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                <Link to='/'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News App
                    </Typography>
                </Link>

                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/MenuBookTwoTone';
import { Link } from "react-router-dom";
import Auth from '../utils/auth'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import '../styles/Header.css'

const logout = (event) => {
    event.preventDefault();
    Auth.logout();
}

export default function TemporaryDrawer() {

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (

        <Box
            className="navigationBox"
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            {/* Conditional to check and display certain links if logged in/out */}
            {Auth.loggedIn() ?
                (
                    <>
                        <List className='navList'>
                            <ListItemButton>
                                <Link to="/" className="navlink">Home</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/me" className="navlink">Profile</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link className="navlink" onClick={logout}>Logout</Link>
                            </ListItemButton>
                        </List>
                    </>
                )
                :
                (
                    <>
                        <List className='navList'>
                            <ListItemButton>
                                <Link to="/" className="navlink">Home</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/login" className="navlink">Login</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/signup" className="navlink">Signup</Link>
                            </ListItemButton>
                        </List>
                    </>
                )
            }
        </Box>
    );

    return (
        <header>
            <div className='headerTitle'>
                <Link to='/'>
                    <h1 className='titleLink'>Not Another Cookbook</h1>
                </Link>
            </div>

            <div className='headerLeft'>
                <div className='headerNav'>
                    {['right'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button className='menuButton' onClick={toggleDrawer(anchor, true)}>
                                <MenuIcon />
                            </Button>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                </div>

                {Auth.loggedIn() ?
                    (
                        <Stack direction="row" spacing={2} className='avatarContainer' >
                            <Link to="/me">
                                <Avatar
                                    className='headerAvatar'
                                    src={Auth.getProfile().data.avatar}
                                    sx={{ width: 75, height: 75 }}
                                />
                            </Link>
                        </Stack>
                    )
                    :
                    (
                        <Stack direction="row" spacing={2} className='avatarContainer' >
                            <Link to='login'>
                                <Avatar
                                    className='headerAvatar'
                                    src="/broken-image.jpg"
                                />
                            </Link>
                        </Stack>
                    )
                }
            </div>
        </header >
    );
}
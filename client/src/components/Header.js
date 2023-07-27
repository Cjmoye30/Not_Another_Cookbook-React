// https://mui.com/material-ui/react-drawer/
// VERY Nice looking side navigation bar which I will be using on all of my websites!
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/MenuOpenRounded';
import { Link } from "react-router-dom";
import Auth from '../utils/auth'

import '../styles/Header.css'

const logout = (event) => {
    event.preventDefault();
    Auth.logout();
}

export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
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
                                <Link to="/profiles" className="navlink">Profiles List</Link>
                            </ListItemButton>

                            <ListItemButton>
                                <Link to="/upload" className="navlink">Upload</Link>
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
                                <Link to="/profiles" className="navlink">Profiles List</Link>
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
            <Divider />
        </Box>
    );

    return (
        <header>
            <div>
                <Link to='/'>
                    <h1>CM</h1>
                </Link>
            </div>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
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
        </header>
    );
}
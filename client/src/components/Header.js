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

import { Link } from "react-router-dom";

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
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            {/* Within this list - turn all of these into navigation items */}
            <List>
                
                <ListItem>
                    <ListItemButton>
                        <Link to="/" className="navlink">Home</Link>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton>
                        <Link to="/profile" className="navlink">Profile</Link>
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton>
                        <Link to="/materialUI" className="navlink">MaterialUI</Link>
                    </ListItemButton>
                </ListItem>

            </List>

            <Divider />

            {/* Additional items I can use in the header */}

        </Box>
    );

    return (
        <div>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
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
    );
}
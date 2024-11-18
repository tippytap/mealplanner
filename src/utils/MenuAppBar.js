import React, {useState} from 'react';
import { AppBar, Toolbar, Fab, Container, Grid, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, List, Box, Button, IconButton, Typography } from '@mui/material';
import { LunchDining, Checklist, Logout, MenuOpen, Close, Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Navigation from './Navigation';
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar () {

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });

    const [open, setOpen] = useState();
    const {auth, logOut} = useAuthContext();
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const iconMap = {
        "Meals": <LunchDining />,
        "Lists": <Checklist />, 
        "Logout": <Logout />,
        "Close": <Close />
    }

    const handleMenuItemClick = (e) => {
        if (e.currentTarget.dataset.menuitem === "Logout") {
            logOut();
            return;
        }

        if (e.currentTarget.dataset.menuitem === "Close") {
            toggleDrawer(false);
            return;
        }

        navigate("/" + e.currentTarget.dataset.menuitem);
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {["Meals", "Lists", "Logout", "Close"].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleMenuItemClick} data-menuitem={text}>
                <ListItemIcon>
                    {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuOpen />
                </IconButton>
                <StyledFab color="secondary" aria-label="add">
                    <Add />
                </StyledFab>
            </Toolbar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </AppBar>
    )
}
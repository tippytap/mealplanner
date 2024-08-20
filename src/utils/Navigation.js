import { Container, Grid, Drawer, ListItem, List, Box, Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LunchDining, Checklist, Logout, MenuOpen, Close } from '@mui/icons-material';
import { useState } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Navigation () {

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
        <Container>
            <Button onClick={toggleDrawer(true)} sx={{position: "absolute", top: "1em", left: "1em"}}><MenuOpen fontSize="large" /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Container>
    )
}
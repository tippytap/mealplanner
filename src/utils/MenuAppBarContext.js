import React, {useState, createContext, useContext} from 'react';
import { AppBar, Toolbar, Fab, Container, Grid, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, List, Box, Button, IconButton, Typography, Modal } from '@mui/material';
import { LunchDining, Checklist, Logout, MenuOpen, Close, Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styles } from '../Styles';

const MenuAppBarContext = createContext();

export const useMenuAppBarContext = () => {
    return useContext(MenuAppBarContext);
}


export const MenuAppBarProvider = ({children}) => {

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 2,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });

    const [open, setOpen] = useState(false);
    const {auth, logOut} = useAuthContext();
    const navigate = useNavigate();
    const [componentToRender, setComponentToRender] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

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
        <Box sx={{ width: 251, justifyContent: "flex-end" }} onClick={toggleDrawer(false)}>
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

    const showGivenComponent = (ComponentToRender) => {
        setComponentToRender(ComponentToRender);
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <MenuAppBarContext.Provider value={{
            showGivenComponent,
            handleModalClose
        }}>
            {children}
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 3 }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuOpen />
                </IconButton>
                <StyledFab color="secondary" aria-label="add" onClick={handleModalOpen}>
                    <Add />
                </StyledFab>
            </Toolbar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    {componentToRender || ""}
                </Box>
            </Modal>
        </AppBar>
        </MenuAppBarContext.Provider>
    )
}
import React, {createContext, useContext, useState, useEffect} from "react";
import Button from '@mui/material/Button';
import {Alert, Slide, Snackbar} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarContext = createContext();

export const useSnackbarContext = () => {
    return useContext(SnackbarContext);
}

export const SnackbarProvider = ({children}) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("Default message");
    const [duration, setDuration] = useState(5000);
    const [severity, setSeverity] = useState("success");

    const snackbarHandleClose = (event, reason) => {
        if (reason == "clickaway") {
            return;
        }
        setOpen(false);
    }

    const showMessage = (message, severity = "success", duration = 5000) => {
        setMessage(message);
        setDuration(duration);
        setSeverity(severity);
        setOpen(true);
    }


    return (
        <SnackbarContext.Provider value={{
            showMessage,
            snackbarHandleClose
        }}>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                autoHideDuration={duration}
                open={open}
                onClose={snackbarHandleClose}
                TransitionComponent={Slide}
            >
                <Alert variant={"filled"} onClose={snackbarHandleClose} severity={severity}>{message}</Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}
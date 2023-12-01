import React from 'react';
import { useAuthContext } from "./AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider } from '@mui/material';

export default function Logout() {

    const {auth, logOut} = useAuthContext();
    const [user] = useAuthState(auth);

    return (
        <>
        {user && <Button onClick={logOut}>Logout</Button>}
        </>
    )
}
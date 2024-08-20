import React, {useState} from 'react';
import { Button, Stack, Typography, TextField, Divider } from '@mui/material';
import { useAuthContext } from './AuthContext';


export default function LoginForm() {

    const {user, logInWithEmailAndPassword} = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        logInWithEmailAndPassword(email, password);
    }

    return (
        <Stack direction="column" spacing={3} divider={<Divider />} sx={{width: "20vw", margin: "0 auto"}}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={3}>
                    <Stack>
                        <TextField id="email" label="Email" onChange={handleEmailChange} />
                    </Stack>
                    <Stack>
                        <TextField type="password" id="password" label="Password" onChange={handlePasswordChange} />
                    </Stack>
                    <Button type="submit" variant="contained">Submit</Button>
                </Stack>
            </form>
        </Stack>
    )
}
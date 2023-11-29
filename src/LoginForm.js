import React, {useState} from 'react';
import { login, logout } from './Firebase';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider } from '@mui/material';
import { useAuthContext } from './AuthContext';


export default function LoginForm(props) {

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
        <Stack direction="column" spacing={3} divider={<Divider />} sx={{width: "50vw", margin: "0 auto"}}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={3}>
                    <Stack>
                        <TextField id="email" label="Email" onChange={handleEmailChange} />
                    </Stack>
                    <Stack>
                        <TextField id="password" label="Password" onChange={handlePasswordChange} />
                    </Stack>
                    <Button type="submit" variant="contained">Submit</Button>
                </Stack>
            </form>
        </Stack>
    )
}

class LoginFormClass extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        const emailVal = event.target[1].value;
        const passVal = event.target[2].value;
        login(emailVal, passVal);
        event.preventDefault();
    }

    handleLogout() {
        logout();
    }

    render() {
        return (
            <>
            <form id="login" onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <button>Submit</button>
                </fieldset>
            </form>
            <button onClick={this.handleLogout}>Log out</button>
            </>
        )
    }
}

// export default LoginForm;
import React, {useEffect} from 'react';
import LoginForm from "./LoginForm";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {

    const {auth} = useAuthContext();
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/Meals");
        }
    }, [user, loading]);

    return (
        <div className="App">
            <main className="container">
                <LoginForm />
            </main>
        </div>
    )
}
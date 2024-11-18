
import React, { useEffect } from 'react';
import MealList from './MealList.js';
import MealForm from './MealForm.js';
import { Container } from '@mui/material';
import { useMealContext } from './MealContext.js';
import { useAuthContext } from "../auth/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import MealFormControl from './MealFormControl.js';
import { useMenuAppBarContext } from '../utils/MenuAppBarContext.js';

function Meals() {

    const {meals} = useMealContext();

    const {auth} = useAuthContext();
    const [user] = useAuthState(auth);

    const {showGivenComponent, handleModalClose} = useMenuAppBarContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate])

    useEffect(() => {
        showGivenComponent(<MealFormControl cancel={handleModalClose} />);
    }, [])

    return (
        <>
        <Container maxWidth="xl">
            <MealList meals={meals} />
        </Container>
        </>
    )
}

export default Meals;
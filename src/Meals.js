
import React, { useContext, useEffect } from 'react';
import MealList from './MealList';
import { AuthContext } from './FirebaseAuthContext';
import { createMeal, getMeals, deleteMeal, updateMealDoc } from './Firebase';
import MealForm from './MealForm';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Container, Grid } from '@mui/material';
import { useMealContext } from './MealContext';
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Navigation from './Navigation.js';

function Meals() {

    const {meals} = useMealContext();

    const {auth} = useAuthContext();
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user])

    return (
        <Container maxWidth="xl">
            <Navigation />
            <MealForm />
            <MealList meals={meals} />
        </Container>
    )
}

export default Meals;

import React, { useContext, useEffect } from 'react';
import MealList from './MealList';
import { AuthContext } from './FirebaseAuthContext';
import { createMeal, getMeals, deleteMeal, updateMealDoc } from './Firebase';
import MealForm from './MealForm';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Container, Grid } from '@mui/material';
import { useMealContext } from './MealContext';

function Meals() {

    const authValue = useContext(AuthContext);

    const {meals} = useMealContext();

    return (
        <>
            {/* {console.log(authValue)} */}
            <Container maxWidth="xl">
                <MealForm />
                <MealList meals={meals} />
            </Container>
        </>
    )
}

export default Meals;
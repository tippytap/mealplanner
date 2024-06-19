import React from 'react';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Container, Grid } from '@mui/material';
import Meal from './Meal';
import { useMealContext } from './MealContext';

export default function MealList(props) {

    const formatName = (name, i) => {
        let formattedName = name + "-" + i
        return formattedName.replaceAll(" ", "-");
    }

    return (
        <Container maxWidth="xl">
            <MealFilterButtons />
            <Grid container spacing={2} alignItems="stretch" mt={5}>
                {props.meals.map((meal, i) => {
                    return (
                        <Grid key={i} item xs={4}>
                            <Meal 
                                key={meal.docId}
                                id={formatName(meal.name, i)}
                                docId={meal.docId}
                                listName={meal.name} 
                                ingredients={meal.ingredients}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export const MealFilterButtons = () => {

    const {filter, updateFilter, categories} = useMealContext();

    const handleClick = (e) => {
        updateFilter(e.target.name);
    }

    return (
        <Stack direction="row" spacing={2} justifyContent={"center"} mt={3}>
            {categories.map((category) => {
                return (
                    <Button variant={filter === category ? "contained" : "text"} onClick={handleClick} name={category} key={category}>{category}</Button>
                )
            })}
        </Stack>
    )
}
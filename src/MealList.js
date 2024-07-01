import React, { useState } from 'react';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Container, Grid, Menu, MenuItem, Divider } from '@mui/material';
import Meal from './Meal';
import { useMealContext } from './MealContext';

export default function MealList(props) {

    const { filter } = useMealContext();

    const formatName = (name, i) => {
        let formattedName = name + "-" + i
        return formattedName.replaceAll(" ", "-");
    }

    return (
        <Container maxWidth="xl">
            <MealFilterButtons />
            <Grid container spacing={2} alignItems="stretch" mt={5}>
                <Container>
                    <Typography variant="h4">{filter !== "all" && filter.toUpperCase()}</Typography>
                </Container>
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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCategoryClick = (e) => {
        updateFilter(e.target.dataset.category);
        handleClose();
    }

    return (
        <Stack direction="row" spacing={2} justifyContent={"center"} mt={3}>
            <Button 
                id="category-button" 
                aria-controls={open ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
               Categories 
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'category-button',
                }}
            >
            {categories.map((category) => {
                return (
                    <MenuItem onClick={handleCategoryClick} data-category={category} name={category} key={category}>{category.toUpperCase()}</MenuItem>
                )
            })}
            </Menu>
        </Stack>
    )
}
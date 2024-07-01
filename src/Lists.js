import { Container, Grid } from '@mui/material';
import React from 'react';
import { useListContext } from './ListContext';
import List from "./List.js";
import ListForm from './ListForm.js';

export default function Lists() {

    const {lists} = useListContext();

    return (
        <Container maxWidth="xl">
            <ListForm />
            <Grid container spacing={2} alignItems="stretch" mt={5}>
                {lists.map((list, i) => {
                    return (
                        <Grid key={i} item xs={4}>
                            <List key={list.id + "-" + i} id={list.id} title={list.title} items={list.items} slug={list.id} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}
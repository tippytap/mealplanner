import { useListContext } from './ListContext';
import { useParams } from 'react-router-dom';
import List from './List';
import React, { useState, useEffect } from 'react';
import { Container, Breadcrumbs, Typography } from '@mui/material';
import Navigation from './Navigation.js';
import { Link } from 'react-router-dom';

export default function DisplaySingleList() {
    const { id } = useParams();
    const { lists } = useListContext();

    const [list, setList] = useState({});

    useEffect(() => {
        setList(lists.filter(list => list.docId === id)[0]);
    }, [lists]);

    return (
        <Container maxWidth="md">
            <Navigation />
            <Breadcrumbs aria-label="breadcrumbs" sx={{marginBottom: "1em"}}>
                <Link underline="hover" color="inherit" to="/Lists">Lists</Link>
                <Typography color="text.primary">{list?.title}</Typography>
            </Breadcrumbs>
            {list?.docId && <List {...list} />}
        </Container>
    )
}
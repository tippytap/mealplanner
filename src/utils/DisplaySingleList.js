import { useListContext } from '../list/ListContext.js';
import { useParams } from 'react-router-dom';
import List from '../list/List.js';
import React, { useState, useEffect } from 'react';
import { Container, Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DisplaySingleList() {
    const { id } = useParams();
    const { lists } = useListContext();

    const [list, setList] = useState({});

    useEffect(() => {
        setList(lists.filter(list => list.id === id)[0]);
    }, [lists]);

    return (
        <Container maxWidth="md">
            <Breadcrumbs aria-label="breadcrumbs" sx={{marginBottom: "1em"}}>
                <Link underline="hover" color="inherit" to="/Lists">Lists</Link>
                <Typography color="text.primary">{list?.title}</Typography>
            </Breadcrumbs>
            {list?.id && <List {...list} slug={list.id} redirect={true} singleList={true} />}
        </Container>
    )
}
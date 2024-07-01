import { useListContext } from './ListContext';
import { useParams } from 'react-router-dom';
import List from './List';
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';

export default function DisplaySingleList() {
    const { id } = useParams();
    const { lists } = useListContext();

    const [list, setList] = useState({});

    useEffect(() => {
        setList(lists.filter(list => list.id === id)[0]);
    }, [lists]);

    return (
        <Container maxWidth="md">
            {list?.id && <List {...list} />}
        </Container>
    )
}
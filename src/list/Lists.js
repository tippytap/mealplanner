import { Container, Grid } from '@mui/material';
import React, {useEffect} from 'react';
import { useListContext } from './ListContext';
import List from "./List.js";
import ListForm from './ListForm.js';
import ListFormControl from './ListFormControl.js';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthContext } from '../auth/AuthContext.js';
import { useMenuAppBarContext } from '../utils/MenuAppBarContext.js';

export default function Lists() {

    const { lists } = useListContext();
    const {auth} = useAuthContext();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { showGivenComponent, handleModalClose } = useMenuAppBarContext();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate])

    useEffect(() => {
        showGivenComponent(<ListFormControl cancel={handleModalClose} />);
    }, []);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} alignItems="stretch" mt={5}>
                {lists.map((list, i) => {
                    return (
                        <Grid key={i} item xs={12} md={4}>
                            <List key={list.id} {...list} slug={list.id} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}
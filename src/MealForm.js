import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material';
import {styles} from './Styles';
import { useMealContext } from './MealContext';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from './categories';
import MealFormControl from './MealFormControl';

export default function MealForm(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button variant="contained" onClick={handleOpen}>
                <Stack direction="row" spacing={2}>
                    <AddCircleOutlineIcon />
                    <Typography>Create a new meal</Typography>
                </Stack>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography variant={"h5"} mb={2}>Create a new meal</Typography>
                    <form>
                      <MealFormControl cancel={handleClose} />
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}
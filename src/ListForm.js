import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';
import {styles} from './Styles';
import CloseIcon from '@mui/icons-material/Close';
import { useListContext } from './ListContext';

export default function ListForm(props) {

    const { saveList, removeList } = useListContext();

    useEffect(() => {
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target[0].value) {
            // saveCategory(category);
            // saveMeal(e.target[0].value, category);
            saveList(e.target[0].value);
            handleClose();
        }
    }

    const handleOnChange = (e) => {
    }

    return (
        <Box>
            <Button variant="contained" onClick={handleOpen}>
                <Stack direction="row" spacing={2}>
                    <AddCircleOutlineIcon />
                    <Typography>Create a new list</Typography>
                </Stack>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Button
                        variant="text"
                        color="error"
                        id={props.id} 
                        onClick={handleClose}
                        sx={{position: "absolute", top: "0", right: "0"}}
                    >
                        <span className='visually-hidden'>Close create new list dialog</span>
                        <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
                        <CloseIcon role="presentation" tabIndex={-1} />
                    </Button>
                    <Typography variant={"h5"} mb={2}>Create a new list</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField variant="filled" id="create_new_meal_text" label="List Title" />
                            <FormControl fullWidth>
                            </FormControl>
                            <Button type="submit" variant="contained">Add list</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}
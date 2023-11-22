import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import {styles} from './Styles';
import { useMealContext } from './MealContext';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from './categories';

export default function MealForm(props) {

    const {saveMeal} = useMealContext();

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCategory("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target[0].value && category) {
            saveMeal(e.target[0].value, category);
            handleClose();
        }
    }

    const handleOnChange = (e) => {
        setCategory(e.target.value);
    }

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
                    <Button
                        variant="text"
                        color="error"
                        id={props.id} 
                        onClick={handleClose}
                        sx={{position: "absolute", top: "0", right: "0"}}
                    >
                        <span className='visually-hidden'>Delete meal</span>
                        <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
                        <CloseIcon role="presentation" tabIndex={-1} />
                    </Button>
                    <Typography variant={"h5"} mb={2}>Create a new meal</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField variant="filled" id="create_new_meal_text" label="Meal Title" />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select 
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={handleOnChange}
                                >
                                    {Object.keys(categories()).map(category => {
                                        if (category !== "all"){
                                            return (
                                                <MenuItem key={category} value={categories()[category]}>{category}</MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained">Add meal</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}
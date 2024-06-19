import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material';
import {styles} from './Styles';
import { useMealContext } from './MealContext';
import CloseIcon from '@mui/icons-material/Close';
import { categories } from './categories';

export default function MealForm(props) {

    const {saveMeal, categories, saveCategory, fetchCategories} = useMealContext();

    const [categorySelectData, setCategorySelectData] = useState([]);

    useEffect(() => {
        setCategorySelectData(categories.map((category) => {
            return {
                inputValue: category,
                title: category
            }
        }))
    }, [categories])

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
            saveCategory(category);
            saveMeal(e.target[0].value, category);
            handleClose();
        }
    }

    const handleOnChange = (e) => {
        setCategory(e.target.value);
    }

    const filter = createFilterOptions();
    const [value, setValue] = useState(null);

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
                                <Autocomplete 
                                    options={categorySelectData}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    freeSolo
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                          return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                          return option.inputValue;
                                        }
                                        // Regular option
                                        return option.title;
                                      }}
                                      filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.title);
                                        if (inputValue !== '' && !isExisting) {
                                          filtered.push({
                                            inputValue,
                                            title: `Add "${inputValue}"`,
                                          });
                                        }
                                
                                        return filtered;
                                      }}
                                      onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                          setValue({
                                            title: newValue,
                                          });
                                          setCategory(newValue.inputValue);
                                        } else if (newValue && newValue.inputValue) {
                                          // Create a new value from the user input
                                          setValue({
                                            title: newValue.inputValue,
                                          });
                                          setCategory(newValue.inputValue);
                                        } else {
                                          setValue(newValue);
                                          setCategory(newValue.inputValue);
                                        }
                                      }}

                                    renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                    renderInput={(params) => <TextField {...params} label="category" />}
                                />
                            </FormControl>
                            <Button type="submit" variant="contained">Add meal</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}
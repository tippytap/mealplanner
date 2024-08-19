import React, {useState, useEffect} from 'react';
import { useMealContext } from './MealContext';
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, Divider, Select, MenuItem, InputLabel, FormControl, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useSnackbarContext } from "./SnackbarContext";
import { useNavigate } from 'react-router-dom';

export default function MealFormControl(props) {

    const {categories, saveMeal, updateMeal, fetchMeals} = useMealContext();
    const {showMessage} = useSnackbarContext();
    const navigate = useNavigate();

    const [categorySelectData, setCategorySelectData] = useState([]);
    const filter = createFilterOptions();
    const [value, setValue] = useState(null);
    const [category, setCategory] = useState(props.meal?.category || "");
    const [title, setTitle] = useState(props.meal?.listName || "");

    useEffect(() => {
        setCategorySelectData(categories.map((category) => {
            return {
                inputValue: category,
                title: category
            }
        }))
    }, [categories])

    const handleSubmit = async () => {
        if (props.meal) {
            await updateMeal({
                ...props.meal,
                name: title,
                category: category
            }).then(() => {showMessage("Meal updated successfully"); fetchMeals()});
            props.cancel();
        }
        else {
            saveMeal(title, category).then(showMessage("Meal created successfully"));
            props.cancel();
        }
    }

    return (
    <Stack direction="column" spacing={2}>
        <TextField 
            variant="filled" 
            id="create_new_meal_text" 
            label="Meal Title" 
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
        />
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
                renderInput={(params) => <TextField {...params} label={props.meal?.category || "category"} />}
            />
        </FormControl>
        <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" onClick={props.cancel}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit} variant="contained">{props.submitText || "Add meal"}</Button>
        </Stack>
        </Stack>
    )
}
import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, CardActions, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState, useEffect } from 'react';
import { useMealContext } from './MealContext';
import Modal from '@mui/material/Modal';
import {styles} from './Styles';

export default function Meal(props) {

  const {removeMeal, updateMeal} = useMealContext();

  const [ingredients, setIngredients] = useState(props.ingredients || []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateMeal({
      docId: props.docId,
      listName: props.listName,
      ingredients: ingredients
    });
  }, [ingredients])

  const handleDeleteIngredient = (e) => {
    const ingredient = e.target.parentElement.name;
    let updatedIngredients = ingredients.filter(item => item.name !== ingredient);
    setIngredients(updatedIngredients);
  }

  const handleSubmitIngredient = (e) => {
    let value = e.target[0].value;
    if (value) {
      updateList(value);
    }
    e.target[0].value = "";
    e.preventDefault();
  }

  const formatKey = (name) => {
    let formattedName = name + "-" + ingredients.length;
    return formattedName.replaceAll(" ", "-");
  }

  const updateList = (value) => {
    const newIngredients = [...ingredients, {name: formatKey(value), desc: value}];
    setIngredients(newIngredients);
  }

  const handleDelete = () => {
    removeMeal(props);
  }

  return (
    <Card variant="outlined" sx={{position: "relative", paddingTop: "1em", height: "100%"}}>
      <Stack justifyContent={"space-between"} sx={{height: "100%"}}>
        <CardHeader title={props.listName} mt="1" />
        <CardContent sx={{height: "100%"}}>
          <Stack spacing={2}>
            <Button
              variant="text"
              color="error"
              id={props.id} 
              onClick={handleOpen}
              sx={{position: "absolute", top: "0", right: "0"}}
            >
                <span className='visually-hidden'>Delete meal</span>
                <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
                <CloseIcon role="presentation" tabIndex={-1} />
            </Button>
            <Stack sx={{marginBottom: "1em"}} divider={<Divider />}>
              {ingredients.map((item, i) => { 
                return <Ingredient key={i} name={item.name} desc={item.desc} delete={handleDeleteIngredient} /> 
              })}
            </Stack>

          </Stack>
        </CardContent>
        <CardActions sx={{width: "100%"}}>
          <Box sx={{padding: "16px", width: "100%"}}>
            <IngredientForm onSubmit={handleSubmitIngredient} />
          </Box>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={styles.modal}>
              <Typography mb={2}>Are you sure you want to delete this meal? This cannot be undone.</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
              </Stack>
            </Box>
          </Modal>
        </CardActions>
      </Stack>
    </Card>
  )
}

const IngredientForm = (props) => {

  return (
      <form className='' onSubmit={props.onSubmit}>
        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
          <TextField label="Add Ingredient" name="list_item_form" type="text" id="list_item_form" sx={{flexGrow: 1}} onKeyDown={props.onKeyDown} />
          <Button type="submit" variant="outlined">
            <span className='visually-hidden'>Add ingredient</span>
            <AddIcon fontSize="small" />
          </Button>
        </Stack>
      </form>
  )
}

const Ingredient = (props) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
      <Typography sx={{paddingLeft: "1em"}}>
        {props.desc} 
      </Typography>
      <Button variant="text" className='btn btn-text text-danger' sx={{position: "relative"}} name={props.name} onClick={props.delete}>
        <span className='visually-hidden'>Delete ingredient</span>
        <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
        <RemoveIcon fontSize="small" />
      </Button>
    </Stack>
  )
}
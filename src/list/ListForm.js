import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Stack, Typography, TextField, Divider, FormControl, Autocomplete } from '@mui/material';
import {styles} from '../Styles';
import CloseIcon from '@mui/icons-material/Close';
import { useListContext } from './ListContext';
import { createFilterOptions } from '@mui/material';
import { uid } from '../constants/uid';
import { useSnackbarContext } from '../utils/SnackbarContext';

export default function ListForm(props) {

  const { saveList, saveListWithItems, lists, updateList } = useListContext();

  const [listName, setListName] = useState();

  const filter = createFilterOptions();
  const [value, setValue] = useState(null);
  const [list, setList] = useState("");

  const {showMessage} = useSnackbarContext();

    useEffect(() => {
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (props.listItems) {
        let listItems = props.listItems.map(item => {
          return {
            id: uid.rnd(),
            title: item.desc,
            complete: false
          }
        })
        if (lists.filter(l => l.title === listName).length > 0) {
          let listToUpdate = lists.filter(l => l.title === listName)[0];
          listToUpdate.items = [...listToUpdate.items, ...listItems];
          await updateList(listToUpdate).then(() => showMessage(`Added to ${listToUpdate.title}`));
          handleClose();
          return;
        }
        await saveListWithItems(listName, listItems);
      }
      else {
        await saveList(listName);
      }
      handleClose();
    }

    const handleOnChange = (e) => {
      setListName(e.target.value);
    }

    const renderAutoComplete = () => {
      return ( 
      <>
      <Typography>Add to existing list</Typography>
      <Autocomplete 
          options={lists}
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
                setList(newValue.inputValue);
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  title: newValue.inputValue,
                });
                setList(newValue.inputValue);
              } else {
                setValue(newValue);
              }
              setListName(newValue.title);
            }}

          renderOption={(props, option) => <li {...props}>{option.title}</li>}
          renderInput={(params) => <TextField {...params} label="list" />}
      />
    </>
  )
    }

    return (
        <Box>
            <Button sx={{width: "100%", margin: "1em 0 0"}} variant="contained" onClick={handleOpen}>
                <Stack direction="row" spacing={2}>
                    <AddCircleOutlineIcon />
                    <Typography>{props.buttonText || "Create a new list"}</Typography>
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
                            <TextField variant="filled" id="create_new_meal_text" label="List Title" onChange={handleOnChange} />
                            <FormControl fullWidth>
                            </FormControl>
                            {props.addToList && <Divider />}
                            {props.addToList && renderAutoComplete()}
                            <Button type="submit" variant="contained">Add list</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}

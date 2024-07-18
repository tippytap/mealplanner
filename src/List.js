import { Box, Button, Icon, Stack, Typography, TextField, Card, CardHeader, CardContent, CardActions, Divider, Container, Grid, ListItemSecondaryAction, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import {styles} from './Styles';
import { useListContext } from './ListContext';
import { Link } from 'react-router-dom';
import { uid } from './constants/uid';
import { useNavigate } from 'react-router-dom';


export default function List(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [listItems, setListItems] = useState([...props.items]);
    const [uncompletedItems, setUncompletedItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    const { removeList, updateList } = useListContext();

    const navigate = useNavigate();

    useEffect(() => {
      setUncompletedItems(listItems.filter(item => !item.complete));
      setCompletedItems(listItems.filter(item => item.complete));
    }, [listItems]);

    const handleDelete = () => {
        removeList(props).then(() => {
          if (props.redirect) {
            navigate("/lists");
          }
        });
    }

    const handleSubmitListItem = (e) => {
      let value = e.target[0].value;
      if (value) {
        updateListItems(value);
      }
      e.target[0].value = "";
      e.preventDefault();
    }

    const formatKey = (name) => {
      let formattedName = name + "-" + listItems.length;
      return formattedName.replaceAll(" ", "-");
    }

    const updateListItems = (value) => {
      const newListItems = [...listItems, {id: uid.rnd(), title: value, completed: false}];
      updateList({
        id: props.id,
        title: props.title,
        items: newListItems,
        docId: props.docId,
        slug: props.slug
      })
      setListItems(newListItems);
    }

    const handleDeleteListItem = (e) => {
      const listItem = e.target.parentElement.id;
      let updatedListItems = listItems.filter(item => item.id !== listItem);
      updateList({
        id: props.id,
        title: props.title,
        items: updatedListItems,
        docId: props.docId,
        slug: props.slug
      })
      setListItems(updatedListItems);
    }

    const handleCheck = (e) => {
      let updatedListItems = listItems.map(item => {
        return {
          id: item.id,
          title: item.title,
          complete: item.id === e.target.parentElement.getAttribute("data-listitem") ? !item.complete : item.complete
        }
      })
      updateList({
        id: props.id,
        title: props.title,
        items: updatedListItems,
        docId: props.docId,
        slug: props.slug
      }) 
      setListItems(updatedListItems);
    }

    return (
        <Card variant="outlined" sx={{position: "relative", paddingTop: "1em", height: "100%"}}>
        <Stack justifyContent={"space-between"} sx={{height: "100%"}}>
          {props.slug && <Link to={`/Lists/${props.slug}`}><CardHeader mt="1" title={props.title} /></Link>}
          {!props.slug && <CardHeader mt="1" title={props.title} />}
          <CardContent sx={{height: "100%"}}>
            <Stack spacing={2}>
              <Button
                variant="text"
                color="error"
                id={props.id} 
                onClick={handleOpen}
                sx={{position: "absolute", top: "0", right: "0"}}
              >
                  <span className='visually-hidden'>Delete list</span>
                  <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
                  <CloseIcon role="presentation" tabIndex={-1} />
              </Button>
              <Stack sx={{marginBottom: "1em"}} divider={<Divider />}>
                {uncompletedItems.map((item, i) => {
                    return (
                        <ListItem title={item.title} id={item.id} key={item.id + "-incomplete-" + i} complete={item.complete} delete={handleDeleteListItem} oncheck={handleCheck} />
                    )
                })}
              </Stack>
              <Stack sx={{marginBottom: "1em"}} divider={<Divider />}>
                <Typography mb={1}>{completedItems.length > 0 && `${completedItems.length} completed item${completedItems.length > 1 ? "s" : ""}`}</Typography>
                {completedItems.map((item, i) => {
                  return (
                    <ListItem title={item.title} id={item.id} key={item.id + "-complete-" + i} complete={item.complete} delete={handleDeleteListItem} oncheck={handleCheck} />
                  )
                })}
              </Stack>
  
            </Stack>
          </CardContent>
          <CardActions sx={{width: "100%"}}>
            <Box sx={{padding: "16px", width: "100%"}}>
              <ListItemForm onSubmit={handleSubmitListItem} />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
              <Box sx={styles.modal}>
                <Typography mb={2}>Are you sure you want to delete this list? This cannot be undone.</Typography>
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

const ListItemForm = (props) => {
    return (
        <form className='' onSubmit={props.onSubmit}>
          <Stack direction="row" justifyContent={"space-between"} spacing={2}>
            <TextField label="Add list item" name="list_item_form" type="text" id="list_item_form" sx={{flexGrow: 1}} onKeyDown={props.onKeyDown} />
            <Button type="submit" variant="outlined">
              <span className='visually-hidden'>Add list item</span>
              <AddIcon fontSize="small" />
            </Button>
          </Stack>
        </form>
    )
}

export const ListItem = (props) => {

    return (
      <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
        <Checkbox onClick={props.oncheck} data-listitem={props.id} checked={props.complete} />
        <Typography sx={{paddingLeft: "1em", textAlign: "left", width: "100%", textDecoration: props.complete && "line-through", color: props.complete && "#515151"}}>
          {props.title} 
        </Typography>
        <Button variant="text" className='btn btn-text text-danger' sx={{position: "relative"}} id={props.id} onClick={props.delete}>
          <span className='visually-hidden'>Delete ingredient</span>
          <span style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>&nbsp;</span>
          <RemoveIcon fontSize="small" />
        </Button>
      </Stack>
    )
}
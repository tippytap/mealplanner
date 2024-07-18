import React, {createContext, useContext, useState, useEffect} from "react";
import { getLists, createList, deleteList, updateListDoc } from './Firebase';
import { useSnackbarContext } from "./SnackbarContext";

const ListContext = createContext();

export const useListContext = () => {
    return useContext(ListContext);
}

export const ListProvider = ({children}) => {

    const [lists, setLists] = useState([]);
    const {showMessage} = useSnackbarContext();

    useEffect(() => {
        fetchLists();
    }, [])

    const fetchLists = async () => {
        let listData = await getLists();
        setLists(listData);
    }

    const saveList = async (list) => {
        await createList(list)
            .then(() => showMessage("List created successfully"))
            .catch(e => showMessage("Unable to create list", "danger"));
        await fetchLists();
    }

    const saveListWithItems = async (list, listItems) => {
        await createList(list, listItems)
            .then(() => showMessage("List created successfully"))
            .catch(e => showMessage("Unable to create list", "danger"));
        await fetchLists();
    }

    const updateList = async (list) => {
        await updateListDoc(list);
        await fetchLists();
    }

    const removeList = async (list) => {
        await deleteList(list)
            .then(() => showMessage("List deleted successfully"))
            .catch(e => showMessage("Unable to delete list", "danger"));
        fetchLists();
    }

    return (
        <ListContext.Provider value={{
            lists,
            removeList,
            saveList,
            updateList,
            saveListWithItems
        }}>
            {children}
        </ListContext.Provider>
    )
}
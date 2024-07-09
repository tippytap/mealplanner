import React, {createContext, useContext, useState, useEffect} from "react";
import { getLists, createList, deleteList, updateListDoc } from './Firebase';

const ListContext = createContext();

export const useListContext = () => {
    return useContext(ListContext);
}

export const ListProvider = ({children}) => {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchLists();
    }, [])

    const fetchLists = async () => {
        let listData = await getLists();
        setLists(listData);
    }

    const saveList = (list) => {
        createList(list);
        fetchLists();
    }

    const updateList = async (list) => {
        await updateListDoc(list);
        await fetchLists();
    }

    const removeList = (list) => {
        deleteList(list);
        fetchLists();
    }

    return (
        <ListContext.Provider value={{
            lists,
            removeList,
            saveList,
            updateList
        }}>
            {children}
        </ListContext.Provider>
    )
}
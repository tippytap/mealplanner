import React, {createContext, useContext, useState, useEffect} from "react";

const ListContext = createContext();

export const useListContext = () => {
    return useContext(ListContext);
}

export const ListProvider = ({children}) => {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        setLists([
            {
                title: "Test list",
                id: "test-list",
                items: [
                    {
                        id: "stub",
                        title: "Stub",
                        complete: false
                    },
                    {
                        id: "stub2",
                        title: "Stub2",
                        complete: true
                    }
                ]
            },
            {
                title: "Test list 2",
                id: "test-list-2",
                items: [
                    {
                        id: "stub",
                        title: "Stub",
                        complete: false
                    },
                ]
            }
        ])
    }, [])

    const fetchLists = async () => {
        // TODO firebase
    }

    const saveList = (list) => {
        // TODO firebase
    }

    const updateList = (list) => {
        // TODO firebase
    }

    const removeList = (list) => {
        // TODO firebase
        const updatedLists = lists.filter((l) => l.id !== list.id);
        setLists(updatedLists);
    }

    return (
        <ListContext.Provider value={{
            lists,
            removeList
        }}>
            {children}
        </ListContext.Provider>
    )
}

// code from: 
// https://medium.com/swlh/firebase-authentication-and-react-protecting-your-routes-18d6da04b4c3


import React, {createContext,useState, useEffect} from 'react';
import { fbAuth, fbOnAuthStateChanged } from './Firebase';
export const AuthContext = createContext({ userDataPresent: false, user: null });



export default function FirebaseAuthContext(props) {

    // define the state for the fn component
    let [state, changeState] = useState({
        // flag to check for user
        userDataPresent: false,
        // user itself
        user: null,
        // observer from firebase
        listener: null
    });

    // useEffect() will run after any component lifecycle hook, so we do not have repeated code.
    // useful here because we want to keep the context up-to-date for use by all components.
    useEffect(() => {
        // check for null listener, if so, assign it to the standard onAuthStateChanged observer
        if(state.listener == null) {
            // must use changeState function in fn component
            changeState({
                ...state,
                // set the listener to the observer, use observer to further change state
                // down the line
                listener: fbOnAuthStateChanged(fbAuth, (user) => {
                    if(user) {
                        changeState( oldState => ({
                            ...oldState,
                            userDataPresent: true,
                            user: user
                        }));
                    }
                    else {
                        changeState( oldState => ({
                            ...oldState,
                            userDataPresent: true,
                            user: null
                        }))
                    }
                })
            })
        }

        return () => {
            if(state.listener) {
                state.listener()
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )

}
import { 
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import React, {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const auth = getAuth();
    console.log(auth);

    const logInWithEmailAndPassword = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const logOut = () => {
        signOut(auth);
    }

    return (
        <AuthContext.Provider value={{
            user,
            logInWithEmailAndPassword,
            auth,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

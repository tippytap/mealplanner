import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import React, {createContext, useContext, useState} from "react";
import { useSnackbarContext } from "../utils/SnackbarContext";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const auth = getAuth();

    const { showMessage } = useSnackbarContext();

    const logInWithEmailAndPassword = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
            showMessage("User logged in successfully");
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/wrong-password":
                case "auth/invalid-email":
                    showMessage("Username or password incorrect", "error");
                    break;
                case "auth/user-not-found":
                    showMessage("User not found", "error");
                    break;
                default:
                    showMessage("There was a problem logging in", "error");
                    break;
            }
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

import React, { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";


export const AuthContext = React.createContext({
    hasAccessToken: false, 
    checkAccessToken: async () => {}
}); 

export const AuthProvider = ({children}) => {

    const [hasAccessToken, setHasAccessToken] = useState(false);
    const {checkLogedIn} = useAppContext()

    const checkAccessToken = async () => {
        const isLoggedIn = await checkLogedIn();
        if(isLoggedIn) {
            try {
                const response = await fetch("api/auth/hasValidAccessToken", {
                    method: 'POST'
                });
            
                const answer = await response.json();
                console.log(answer);
    
                if(answer.hasToken) {
                    setHasAccessToken(true);
                }
            
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        checkAccessToken();
    }, []);

    return (
        <AuthContext.Provider value={{hasAccessToken, checkAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { useEffect, useState } from "react";


export const AuthContext = React.createContext({
    hasAccessToken: false, 
    checkAccessToken: async () => {}
}); 

export const AuthProvider = ({children}) => {

    const [hasAccessToken, setHasAccessToken] = useState(false);

    const checkAccessToken = async () => {
        try {
            console.log('hello world');
            const response = await fetch("api/auth/hasValidAccessToken", {
                method: 'POST'
            });
        
            const answer = await response.json();
            // console.log('answer');
            console.log(answer.hasToken);

            if(answer.hasToken) {
                setHasAccessToken(true);
            }
        
        } catch (error) {
            console.log(error);
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
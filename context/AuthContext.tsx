import React, { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";


export const AuthContext = React.createContext({
    hasAccessToken: false, 
    rouletteOptions: [1, 1, 1, 1, 5, 1, 1, 1, 1, 5],
    checkAccessToken: async () => {},
    setRouletteOptionsCxt: async (options: number[]) => {},
    getRouletteOptions: async () => {}
}); 

export const AuthProvider = ({children}) => {

    const [hasAccessToken, setHasAccessToken] = useState(false);
    const [rouletteOptions, setRouletteOptions] = useState([1, 1, 1, 1, 5, 1, 1, 1, 1, 5]);

    const {checkLogedIn} = useAppContext()

    const checkAccessToken = async () => {
        const isLoggedIn = await checkLogedIn();
        if(isLoggedIn) {
            try {
                const response = await fetch("api/auth/hasValidAccessToken", {
                    method: 'POST'
                });
            
                const answer = await response.json();
    
                if(answer.hasToken) {
                    setHasAccessToken(true);
                }
            
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getRouletteOptions = async () => {
        try {
            const response = await fetch("api/options/get", {
                method: 'GET',
            });

            const json = await response.json();
            if(!json.options) {
                setRouletteOptions([1, 1, 1, 1, 5, 1, 1, 1, 1, 5]);
                return;
            }
            
            const rouletteOptions = json.options;
            // console.log(rouletteOptions);
            // console.log(JSON.parse(json.options)[0])
            setRouletteOptions(rouletteOptions);
        } catch(error) {

        }
    }

    const setRouletteOptionsCxt = async (options: number[]) => {
        try {
            const response = await fetch("api/options/set", {
                method: 'POST',
                body: JSON.stringify({options: JSON.stringify(options)})
            });

            const json = await response.json();
            if(!json.options) {
                return;
            }
            const rouletteOptions = JSON.parse(json.options);

            setRouletteOptions(rouletteOptions);
        } catch(error) {

        }
    }

    useEffect(() => {
        checkAccessToken();
        getRouletteOptions();
    }, []);

    return (
        <AuthContext.Provider value={{
            hasAccessToken, 
            rouletteOptions, 
            checkAccessToken, 
            getRouletteOptions, 
            setRouletteOptionsCxt
        }}>
            {children}
        </AuthContext.Provider>
    )
}
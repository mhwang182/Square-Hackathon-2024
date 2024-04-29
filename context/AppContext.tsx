'use client'

import React, { Reducer, useContext, useReducer } from "react";
import { ReactElement } from "react";

export interface Customer {
    id: string,
    created_at: string,
    updated_at: string,
    given_name: string,
    family_name: string,
    email_address: string,
    preferences: any,
    creation_source: string,
    version: number
}

interface IAppState {
    customer?: Customer,
    isCustomerLoading: boolean,
    isUserLoading: boolean,
    // rouletteOptions: number[],
    userToken: string
}

const initialState: IAppState = {
    customer: {} as Customer, 
    isCustomerLoading: false,
    isUserLoading: false,
    userToken: "",
    // rouletteOptions: [1, 1, 1, 1, 5, 1, 1, 1, 1, 5]
};

const AppContext = React.createContext({
    ...initialState,
    searchCustomer: (email: string) => {},
    createGiftCard: (customerId: string, amount: number): any => {},
    createUser: (email: string, password: string): any => {},
    loginUser: (email: string, password: string): any => {},
    checkLogedIn: (): any => {},
    logout: (): any => {},
    getSquareAuthorizeLink: (token: string): any => {},
    // getRouletteOptions: (): any => {},
    // setRouletteOptions: (options: string): any => {}
});

const reducer = (state, action): IAppState => {
    switch(action.type){
        case 'loadingCustomer':
            return {...state, isCustomerLoading: true};
        case 'customerLoaded':
            return {...state, isCustomerLoading: false};
        case 'setCustomer':
            return {...state, customer: action.payload.customer};
        case 'loadingUser':
            return {...state, isUserLoading: true};
        case 'userLoaded':
            action.payload.checkLogedIn();
            return {...state, isUserLoading: false};
        case 'setUserToken':
            return {...state, userToken: action.payload.token}
        case 'logout':
            return {...state, userToken: ""}
        // case 'setRouletteOptions':
        //     console.log('options set');
        //     return {...state, rouletteOptions: action.payload.options}
        default:
            throw Error()
    }
}

export const ContextProvider = ({children}: {children: ReactElement}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const checkLogedIn = async () => {
        try {
            const response = await fetch("api/auth/isLoggedIn", {
                method: 'POST'
            });
        
            const answer = await response.json();
        
            if(answer.loggedIn) {
                dispatch({type: 'setUserToken', payload: {token: answer.token}});
            }
        } catch (error) {
            console.log(error);
        }
        return true;
    }

    const logout = async () => {
        try {
            await fetch("api/auth/Logout", {
                method: 'POST'
            });
            dispatch({type: 'logout'});
        } catch(error) {
            console.log(error);
        }
    }
    const searchCustomer = async (email: string) => {
        try {
            dispatch({type: "loadingCustomer"});
            const customer = await fetch("api/getCustomer", {
                method: 'POST',
                body: JSON.stringify({customerEmail: email})
            });

            const result = await customer.json();
            dispatch({type: "customerLoaded"});
            dispatch({type: "setCustomer", payload: {customer: result.length > 0 ? result[0] : {}}});
            
        } catch(error) {
            dispatch({type: "customerLoaded"});
            console.log(error);
        }
    }

    const createGiftCard = async (customerId: string, amount: number) => {
        try {
            const response = await fetch("api/getGiftCard", {
                method: 'POST',
                body: JSON.stringify({customerId, amount})
            })
            const giftCard = await response.json()
            return giftCard
        } catch(error) {
            console.log(error);
            return {};
        }
    }

    const createUser = async (email: string, password: string) => {
        try {
            dispatch({type: "loadingUser"});
            const response = await fetch("api/user/create", {
                method: 'POST',
                body: JSON.stringify({email, password})
            })

            const data = await response.json();
            dispatch({type: "userLoaded", payload: {checkLogedIn}});
            return data;
        } catch (error) {
            console.log(error);
            dispatch({type: "userLoaded"});
            return null;
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            dispatch({type: "loadingUser"});
            const response = await fetch("api/user/login", {
                method: 'POST',
                body: JSON.stringify({email, password})
            })

            const data = await response.json();
            dispatch({type: "userLoaded", payload: {checkLogedIn}});
            return data;
        } catch (error) {
            console.log(error);
            dispatch({type: "userLoaded"});
            return null;
        }
    }

    const getSquareAuthorizeLink = async (token: string) => {
        try {
            const response = await fetch("api/square/authorizeLink", {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })

            const data = await response.json();
            if(!data.link) {
                return "/";
            }

            return data.link;
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    // const getRouletteOptions = async () => {
    //     try {
    //         const response = await fetch("api/options/get", {
    //             method: 'GET',
    //         });

    //         const json = await response.json();
    //         if(!json.options) {
    //             dispatch({
    //                 type: "setRouletteOptions", 
    //                 payload: {options: [1, 1, 1, 1, 5, 1, 1, 1, 1, 5]}})
    //             return;
    //         }
            
    //         console.log(json.options);
            
    //         const rouletteOptions = JSON.parse(json.options);
    //         // console.log(rouletteOptions);
    //         // console.log(JSON.parse(json.options)[0])
    //         dispatch({type: "setRouletteOptions", payload: {options: rouletteOptions}})
    //     } catch(error) {

    //     }
    // }

    // const setRouletteOptions = async (options: string) => {
    //     try {
    //         const response = await fetch("api/options/set", {
    //             method: 'POST',
    //             body: JSON.stringify({options: JSON.stringify(options)})
    //         });

    //         const json = await response.json();
    //         if(!json.options) {
    //             return;
    //         }
    //         const rouletteOptions = json.options;
    //         dispatch({type: "setRouletteOptions", payload: {options: rouletteOptions}});
    //     } catch(error) {

    //     }
    // }

    return (
        <AppContext.Provider value={{
            ...state, 
            searchCustomer, 
            createGiftCard, 
            createUser, 
            checkLogedIn, 
            logout, 
            getSquareAuthorizeLink,
            loginUser,
            // getRouletteOptions,
            // setRouletteOptions
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}
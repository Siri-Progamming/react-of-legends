import {AuthenticationContext} from "./AuthenticationContext.ts";
import {ReactNode, useEffect, useReducer} from "react";
import { LOGIN, authReducer, initState} from "../reducers/AuthReducer"

export const AuthenticationProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initState)

    useEffect(() => {
        const user = localStorage.getItem('@user')
        if (user) {
            dispatch({ type: LOGIN, payload: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthenticationContext.Provider value={{state, dispatch}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

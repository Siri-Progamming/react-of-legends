import {AuthenticationContext} from "./AuthenticationContext.ts";
import {ReactNode, useState} from "react";
import {User, LoginInfos} from "./AuthenticationContext.ts";

export const AuthenticationProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (loginInfos:LoginInfos) => {
        setUser(loginInfos)
    }

    console.log(user)
    const logout = () => {
    }

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}
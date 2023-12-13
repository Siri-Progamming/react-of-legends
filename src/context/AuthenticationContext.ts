import {createContext} from "react";

export interface User extends LoginInfos {
}
export interface LoginInfos {
    email: string,
    password: string
}
interface DefaultValues {
    user: User | null,
    setUser: (user: User) => void,
    login: (loginInfos : LoginInfos) => void,
    logout: () => void
}

const defaultValues: DefaultValues = {
    user: null,
    setUser: () => {
    },
    login: () => {
    },
    logout: () => {
    }
}
export const AuthenticationContext = createContext(defaultValues);
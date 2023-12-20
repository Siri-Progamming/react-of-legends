import {createContext} from "react";
import {initState} from "../reducers/AuthReducer.tsx";
import 'firebase/auth';
import firebase from "firebase/compat/app";
import User = firebase.User;

export interface State{
    isLogged: boolean,
    isLoading: boolean,
    userInfos: null,
}
export interface LoginInfos {
    email: string,
    password: string
}
interface DefaultValues {
    state: State,
    dispatch: (action: { payload: User; type: string }) => void
}

const defaultValues: DefaultValues = {
    state: initState,
    dispatch: () => {
    }
}
export const AuthenticationContext = createContext(defaultValues);

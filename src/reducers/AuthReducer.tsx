import {State} from "../context/AuthenticationContext.ts";
import firebase from "firebase/compat/app";
import User = firebase.User;

export const initState:State = {
    isLogged: false,
    isLoading: false,
    userInfos: null,
}

export interface Dispatch {
    type: string;
    payload: User | null;
}

export const LOGIN:string = "LOGIN"
export const LOGOUT:string = "LOGOUT"
export const SET_LOADING:string = "SET_LOADING"
export const UPDATE_USER_INFOS:string = "UPDATE_USER_INFOS"

export const authReducer = (state:State, action:Dispatch):State => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogged: true,
                isLoading: false,
                userInfos: action.payload,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case UPDATE_USER_INFOS:
            return {
                ...state,
                isLoading: false,
                userInfos: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isLogged: false,
                userInfos: initState.userInfos
            }
        default:
            return initState
    }
}

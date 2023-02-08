import { createContext, useContext, useReducer } from "react";
import { User } from "../types";
import { stringify } from "querystring";

interface State {
    authenticated: boolean;
    user: User | undefined;
    loading: boolean;
}

const StateContext = createContext<State>({
    authenticated: false,
    user: undefined,
    loading: true
})

const DispatchContext = createContext<any>(null);

interface Action {
    type: String;
    payload: any;
}

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                user: payload
            }
        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
                user: null
            }
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            }
        default:
            throw new Error(`UNKNOWN ACTION TYPE : ${type}`)
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true
    })

    const dispatch = (type: string, payload?: any) => {
        defaultDispatch({ type, payload })
    }

    console.log("state",state);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
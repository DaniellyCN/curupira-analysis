import { useReducer, useContext, createContext } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();


export const Provider = ({children}) => {
    const [state, dispatch] = useReducer();


    return(
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}

            </StateContext.Provider>
        </DispatchContext.Provider>

    )
}
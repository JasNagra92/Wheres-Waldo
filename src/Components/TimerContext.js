import React, {useState,createContext, Children} from "react";

export const TimerContext = createContext()

export const TimerProvider = props => {
    const [timer, setTimer] = useState()
    return (
        <TimerContext.Provider value={[timer, setTimer]}>
            {props.children}
        </TimerContext.Provider>
    )
}
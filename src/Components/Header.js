import React, {useContext} from "react";
import { TimerContext } from "./TimerContext";

const Header = () => {
    const [timer,setTimer] = useContext(TimerContext)
    return (
        <div>
            <h1> Wheres Waldo DBZ style </h1>
            <p>{timer}</p>
        </div>
    )
}
export default Header
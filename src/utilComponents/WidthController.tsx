import React, { useState } from "react";
import store from "../store/store";

export default function WidthController() {
    const [inputvalue, setinputValue] = useState<string>("")
    const handleOnClick =  (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if(e.key === "Backspace") {
            setinputValue(inputvalue.slice(0,inputvalue.length-1))
            store.dispatch({type:"width", value:inputvalue.slice(0,inputvalue.length-1)})
        } else {
        setinputValue(inputvalue + e.key)
        store.dispatch({type:"width", value:inputvalue + e.key})
        }
        
    }

    return(
        <>
            <div>
                <input value={inputvalue} onKeyUp={(e) => handleOnClick(e)} type="number"></input>
            </div>
        </>
    )
}
import React, { useState } from "react";
import store from "../store/store";
import WritingToolContainer from "./WritingToolContainer";
interface ActiveController {
    value: string,
    active: boolean
}
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
    const widths: ActiveController[] = [
        {value:"2", active: true},
        {value:"4", active: false},
        {value:"8", active: false},
        {value:"16", active: false},
    ]
    return(
        <>
            <div>
                <WritingToolContainer label="pencilwidth" strokeWidth={widths}></WritingToolContainer>
            </div>
        </>
    )
}
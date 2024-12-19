import React, { useState } from "react";
import store from "../store/store";
import WritingToolContainer from "./WritingToolContainer";

export default function ColorController() {
    const [color, setColorvalue] = useState<string>("#00000")
    const handleOnClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Backspace") {
            setColorvalue(color+e.key)
            store.dispatch({type:"colorChange", value: color +  e.key})
        } else if(e.key === "Backspace"){
            setColorvalue(color.slice(0, color.length-1))
        }
    }
    return(
        <>
            <div>
                {/* <input value={color}  onKeyUp={(e) => handleOnClick(e)}></input> */}
                <WritingToolContainer label="colorselector"></WritingToolContainer>
            </div>
        </>
    )
}
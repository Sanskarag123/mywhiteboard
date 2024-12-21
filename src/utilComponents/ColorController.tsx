import React, { useState } from "react";
import store from "../store/store";
import WritingToolContainer from "./WritingToolContainer";
import ActiveController from "../interfaces/ActiveController";

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

    const colors: ActiveController[] = [{value:"#131010", active : true},{value:"#F72C5B", active: false},{value : "#A7D477", active: false} , {value:"#EF9C66", active: false}]
    return(
        <>
            <div>
                {/* <input value={color}  onKeyUp={(e) => handleOnClick(e)}></input> */}
                <WritingToolContainer label="colorselector" colors={colors}></WritingToolContainer>
            </div>
        </>
    )
}
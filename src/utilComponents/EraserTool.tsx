import React from "react";
import WritingToolContainer from "./WritingToolContainer";
import store from "../store/store";

export default function EraserTool() {
    const triggerEraser = () => {
        store.dispatch({type:"eraser"})
    }
    return(
        <>  
            <div onClick={() => triggerEraser()}>
                <WritingToolContainer label="Eraser" ></WritingToolContainer>
            </div>
        </>
    )
}
import React from "react";
import { useDispatch } from "react-redux";
import store from "../store/store";
import WritingToolContainer from "./WritingToolContainer";

export default function PenTool() {
    
    const changePen = () => {
        console.log("clicked")
        store.dispatch({type:"writeTool", value:"pen"})

    }
    
    return(
        <>
            <div onClick={() => changePen()}>
            <WritingToolContainer label="pen"></WritingToolContainer>
            </div>
        </>
    )
}
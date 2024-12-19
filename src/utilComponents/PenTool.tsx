import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store/store";
import WritingToolContainer from "./WritingToolContainer";

export default function PenTool() {
    
    const [color, setColor] = useState("#000000")

    const changePen = () => {
        console.log("clicked")
        store.dispatch({type:"writeTool", value:"pen"})
    }

    useEffect(() => {
        store.subscribe(() => {
            if(store.getState()) {
                const writeTool = store.getState().writeTool
                if(writeTool.toolName === "pen") {
                    setColor(writeTool.toolColor)
                }
            }
        })
    })

    
    return(
        <>
            <div onClick={() => changePen()}>
            <WritingToolContainer label="pen" toolColor={color}></WritingToolContainer>
            </div>
        </>
    )
}
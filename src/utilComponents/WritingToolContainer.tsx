import React, { CSSProperties, useState } from "react";
import WritingToolProps from "../interfaces/WritingToolProps";
import PenIcon from "./icons/PenIcon";
import EraserIcon from "./icons/EraserIcon";
import AddIcon from "./icons/AddIcon";
import RectangleIcon from "./icons/RectangleIcon";
import ClearAllIcon from "./icons/ClearAllIcon";
import ColorIcons from "./icons/ColorIcons";
import RightIcon from "./icons/RightIcon";
import PencilWidth from "./icons/PencilWidth";

export default function WritingToolContainer(props: WritingToolProps) {

    const [buttonStyle, setButtonStyle] = useState<CSSProperties | null>(null)
    const [arrowStyle, setArrowStyle] = useState<CSSProperties | null>(null)

    const handleAttributeClick = (event: React.MouseEvent ) => {
        
    }

    const handleExpandClick = () => {

        if(buttonStyle === null) {
                const style: CSSProperties = {
                    "width":"150px",
                }
                const styleArrow: CSSProperties = {
                    "marginLeft":"140px",
                }
                setButtonStyle(style)
                setArrowStyle(styleArrow)
            } else {
                setButtonStyle(null)
                setArrowStyle(null)
            }

        }

    const handleIcons = () => {
        switch(props.label) {
            case "pen":
                return <PenIcon toolColor={props.toolColor?props.toolColor:"#000000"}></PenIcon>
            case "eraser":
                return <EraserIcon></EraserIcon>
            case "add":
                return <AddIcon></AddIcon>
            case "rect":
                return <RectangleIcon></RectangleIcon>
            case "clear":
                return <ClearAllIcon></ClearAllIcon>
            case "colorselector":
                return <ColorIcons></ColorIcons>
            case "pencilwidth":
                return <PencilWidth></PencilWidth>
            default:
                return props.label
        }
    }

    const uiOnExpand = () => {
        if(!!buttonStyle) {
        let strokes: Array<number> = [
            2, 4, 8, 16, 32
        ]
        return strokes
        } else {
            return []
        }
    }
    return(
        <>
        <div className="flex-container">
        <div className="tool-button" style={!!buttonStyle? buttonStyle:{}}>
                {handleIcons() }
                {!!buttonStyle?
                    uiOnExpand().map((strokeWidth: number, index: number) => {
                        return <><span className="in-button" style={{"marginLeft":(index)*(16+ 6)+ "px" }}>{strokeWidth}</span></>
                    })
                :""}
    
            
        </div>
        {
        props.label === "colorselector" || props.label === "pencilwidth" ?
        <div className="button-expand" style={!!arrowStyle? arrowStyle:{}} onClick={() => handleExpandClick()} >
            <RightIcon></RightIcon>
        </div> :""
        }
        </div>
        </>
    )
}
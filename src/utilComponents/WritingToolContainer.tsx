import React from "react";
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
    return(
        <>
        <div className="flex-container">
        <div className="tool-button">
        {
            handleIcons()
        }
        </div>
        {
        props.label === "colorselector" || props.label === "pencilwidth" ?
        <div className="button-expand">
            <RightIcon></RightIcon>
        </div> :""
        }
        </div>
        </>
    )
}
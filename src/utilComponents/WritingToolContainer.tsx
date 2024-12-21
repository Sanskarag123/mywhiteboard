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
import Circle from "./icons/Circle";
import ActiveController from "../interfaces/ActiveController";
import store from "../store/store";

export default function WritingToolContainer(props: WritingToolProps) {

    const [buttonStyle, setButtonStyle] = useState<CSSProperties | null>(null)
    const [arrowStyle, setArrowStyle] = useState<CSSProperties | null>(null)

    const [strokeWidth, setStrokeWidth] = useState<ActiveController[] | null>(props.strokeWidth? props.strokeWidth: null)
    const [colorsState, setColorsState] = useState(props.colors? props.colors: null)

    const handleAttributeClick = (value: string) => {
        store.dispatch({type:"width",value: value})
        if(strokeWidth) {
        setStrokeWidth(strokeWidth.map((itr: ActiveController) => {
            if(itr.value === value) {
                itr.active = true
            } else {
                itr.active = false
            }
            return itr
        }))
        }
    }

    const handleColorClick = (colorvalue: string) => {
        store.dispatch({type:"colorChange", value:colorvalue})
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

        if(strokeWidth) {
        let strokes = strokeWidth.map( (strokeWidth: ActiveController,index: number) => {
            return <><span className="in-button" style={{"marginLeft":(index)*(16+ 6)+ "px","backgroundColor":strokeWidth.active?"rgba(2,2 ,2 , 0.2)":""}} onClick={() => handleAttributeClick(strokeWidth.value)}>{strokeWidth.value}</span></>
        })
        return strokes
        }

        if(props.colors) {
            let colors = props.colors.map((color: ActiveController, index: number) => {
                return <><Circle color={color.value} onClick={handleColorClick}></Circle></>
            })
            return colors;
        }
        } else {
            return []
        }
    }
    return(
        <>
        <div style={props.label === "colorselector" || props.label === "pencilwidth" ? {"marginRight":"20px"}:{}}>
        <div className="flex-container">
        <div className="tool-button" style={!!buttonStyle? buttonStyle:{}}>
                {handleIcons() }
                {!!buttonStyle?
                    uiOnExpand()
                :""}
        </div>
        {
        props.label === "colorselector" || props.label === "pencilwidth" ?
        <div className="button-expand" style={!!arrowStyle? arrowStyle:{}} onClick={() => handleExpandClick()} >
            <RightIcon></RightIcon>
        </div> :""
        }
        </div>
        </div>
        </>
    )
}
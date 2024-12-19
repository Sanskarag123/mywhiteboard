import React, { useRef } from "react";
import WritingToolContainer from "./WritingToolContainer";
import store from "../store/store";

export default function ClearCanvas() {

    const handleOnClick = () => {
        const canvas: HTMLCollectionOf<Element> = document.getElementsByClassName("main-canvas")
        if(canvas.length === 1) {
            const mainCanvas: HTMLCanvasElement = canvas.item(0) as HTMLCanvasElement
            const context:CanvasRenderingContext2D  | null = mainCanvas.getContext('2d')
            if(context) {
                context.clearRect(0,0, mainCanvas.width, mainCanvas.height)
            }
        }
    }
    return(<>
        <div onClick={() => handleOnClick()}>
            <WritingToolContainer label="Clear"></WritingToolContainer>
        </div>
    </>)
}
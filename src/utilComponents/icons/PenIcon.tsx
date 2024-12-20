import React from "react";
import WritingToolProps from "../../interfaces/WritingToolProps";

interface toolColor {
    toolColor: string
}

export default function PenIcon(props: toolColor) {
    return(
        <>
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <title>icon 135 pen angled</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                <g id="icon-135-pen-angled" fill={props.toolColor? props.toolColor:"#000000"}>
                    <path d="M23.1464466,12.0278086 L11.8535534,23.3207019 L11.8535534,23.3207019 L7.85355339,19.3207019 L19.1464466,8.02780864 L23.1464466,12.0278086 L23.1464466,12.0278086 Z M23.8535534,11.3207018 L25.5801067,9.59414849 C26.3642921,8.8099631 26.3661881,7.54044334 25.5897496,6.76400487 L24.4102504,5.58450561 C23.6313906,4.80564584 22.372781,4.80147421 21.5801067,5.59414851 L19.8535534,7.32070186 L23.8535534,11.3207018 L23.8535534,11.3207018 Z M11.1464466,24.0278086 L11,24.1742552 L6,25.1742552 L7,20.1742552 L7.14644661,20.0278086 L11.1464466,24.0278086 L11.1464466,24.0278086 Z" id="pen-angled" ></path>
                </g>
            </g>
            </svg>
        </>
    )
}
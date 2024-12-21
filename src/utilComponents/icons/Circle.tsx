import React from "react";

interface ColorProp {
    color: string,
    onClick: Function
}
export default function Circle(props: ColorProp) {
    return(
        <>
            <svg onClick={() => props.onClick(props.color)} version="1.1" id="circle-11" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="-2 -1 15 15" fill={props.color}>
                <path d="M10,5.5C10,7.9853,7.9853,10,5.5,10S1,7.9853,1,5.5S3.0147,1,5.5,1S10,3.0147,10,5.5z"/>
            </svg>
        </>
    )
}
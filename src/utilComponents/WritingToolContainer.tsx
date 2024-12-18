import React from "react";
import WritingToolProps from "../interfaces/WritingToolProps";

export default function WritingToolContainer(props: WritingToolProps) {
    return(
        <div className="tool-button">
        <span>{props.label}</span>
        </div>
    )
}
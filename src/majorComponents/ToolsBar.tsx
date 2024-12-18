import React from "react";
import PenTool from "../utilComponents/PenTool";

export default function ToolsBar() {
    return(
        <>
            <div className="tools-window">
                <div className="flex-container">
                    <PenTool></PenTool>
                </div>
            </div>
        </>
    )
}
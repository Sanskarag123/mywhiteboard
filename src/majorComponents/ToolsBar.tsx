import React from "react";
import PenTool from "../utilComponents/PenTool";
import EraserTool from "../utilComponents/EraserTool";

export default function ToolsBar() {
    return(
        <>
            <div className="tools-window">
                <div className="flex-container">
                    <PenTool></PenTool>
                    <EraserTool></EraserTool>
                </div>
            </div>
        </>
    )
}
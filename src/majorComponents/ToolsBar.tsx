import React from "react";
import PenTool from "../utilComponents/PenTool";
import EraserTool from "../utilComponents/EraserTool";
import ZoomButton from "../utilComponents/ZoomButton";
import Rectangle from "../utilComponents/RectangleButton";
import ClearCanvas from "../utilComponents/ClearCanvas";

export default function ToolsBar() {
    return(
        <>
            <div className="tools-window">
                <div className="flex-container">
                    <PenTool></PenTool>
                    <EraserTool></EraserTool>
                    <ZoomButton></ZoomButton>
                    <Rectangle></Rectangle>
                    <ClearCanvas></ClearCanvas>
                </div>
            </div>
        </>
    )
}
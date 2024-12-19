import React from "react";
import PenTool from "../utilComponents/PenTool";
import EraserTool from "../utilComponents/EraserTool";
import ZoomButton from "../utilComponents/ZoomButton";
import Rectangle from "../utilComponents/RectangleButton";
import ClearCanvas from "../utilComponents/ClearCanvas";
import WidthController from "../utilComponents/WidthController";
import ColorController from "../utilComponents/ColorController";

export default function ToolsBar() {
    return(
        <>
            <div className="tools-window">
                <div className="flex-container">
                    <PenTool></PenTool>
                    <EraserTool></EraserTool>
                    {/* <ZoomButton></ZoomButton> */}
                    <Rectangle></Rectangle>
                    <ClearCanvas></ClearCanvas>
                    <WidthController></WidthController>
                    <ColorController></ColorController>
                </div>
            </div>
        </>
    )
}
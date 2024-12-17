import React from "react";
import ToolsBar from "./ToolsBar";
import WhiteBoard from "./WhiteBoard";

export default function StartWindow() {
    return(
    <React.StrictMode>
        <div className="start-window">
            <ToolsBar></ToolsBar>
            <WhiteBoard></WhiteBoard>
        </div>
    </React.StrictMode>
    )
}
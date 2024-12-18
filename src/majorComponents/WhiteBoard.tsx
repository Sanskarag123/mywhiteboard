import React from "react";
import WhiteBoardCanvas from "./WhiteBoardCanvas";

export default function WhiteBoard() {
    return(
        <div className="whiteboard" id="whiteboard-area">
            <WhiteBoardCanvas></WhiteBoardCanvas>
        </div>
    )
}
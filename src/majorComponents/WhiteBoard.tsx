import React, { useEffect } from "react";
import WhiteBoardCanvas from "./WhiteBoardCanvas";
import store from "../store/store";

export default function WhiteBoard() {

    return(
        <div className="whiteboard" id="whiteboard-area">
            <WhiteBoardCanvas ></WhiteBoardCanvas>
        </div>
    )
}
import React from "react";

export default function ZoomButton() {
    return(<>
        <React.StrictMode>
        <div className="zoom-buttons flex-container">
            <div> + </div>
            <div> - </div>
        </div>
        </React.StrictMode>
    </>)
}
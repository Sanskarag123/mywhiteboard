import React from "react";
import WritingToolContainer from "./WritingToolContainer";
import store from "../store/store";

export default function Rectangle() {
    const handleOnClick = () => {
        store.dispatch({type: "rectangle"})
    }
    return(<>
        <div onClick={() => handleOnClick()}>
            <WritingToolContainer label="Rect"></WritingToolContainer>
        </div>
    </>)
}
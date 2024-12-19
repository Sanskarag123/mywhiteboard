import { Action, configureStore } from '@reduxjs/toolkit'
import WritingToolType from '../interfaces/WritingToolType'
import { act } from 'react'
// ...

const initialWriteState: WritingToolType = {
    toolName:'pen',
    toolWidth: 2,
    toolColor: '#000000'

}
interface CommonAction extends Action {
    value?: string
}

const width: string = "2"

const writeToolReducer = (state: WritingToolType = initialWriteState, action: CommonAction) => {
    if(action.type === "colorChange") {
        const newState = {...state, toolColor:action.value? action.value:'#000000'}
        return newState
    }
    if(action.type !== "writeTool") return state
    switch(action.value) {
        case "pen":
            return{
                ...state,
                toolName: "pen",
                toolColor: "#000000"
            }
        case "eraser":
            return {
                ...state,
                toolName: "eraser",
                toolColor: "#FFFFFF"
            }
        case "rectangle":
            return {
                ...state,
                toolName: "rectangle",
                toolColor: "#000000"
            }
        default:
            return state
    }
}

const widthReducer = (state: string = width, action: CommonAction) => {
    if(action.type === "width")
    return action.value
    else
    return state
}

const store = configureStore({
  reducer: {
    writeTool: writeToolReducer,
    widthChange: widthReducer
  },
})

export default store




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { Action, configureStore } from '@reduxjs/toolkit'
import WritingToolType from '../interfaces/WritingToolType'
// ...

const initialWriteState: WritingToolType = {
    toolName:'pen',
    toolWidth: 2,
    toolColor: '#000000'

}

const writeToolReducer = (state: WritingToolType = initialWriteState, action: Action) => {
    switch(action.type) {
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
        default:
            return state
    }
}

const store = configureStore({
  reducer: {
    writeTool: writeToolReducer,
  },
})

export default store




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
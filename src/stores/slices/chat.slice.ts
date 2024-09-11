import { createSlice } from "@reduxjs/toolkit"

// chatState type
interface chatState {
    chatId : string
}

// initial value for chatState
const initialState : chatState = {
    chatId : ''
}

// userSlice for store reducer
const chatSlice = createSlice({
    name : 'chat',
    initialState,
    reducers : {}
})

const chatReducer = chatSlice.reducer;

export default chatReducer
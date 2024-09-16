import { createSlice } from "@reduxjs/toolkit"

// notificationState type
interface notificationState {
    notificationId : string
}

// initial value for notificationState
const initialState : notificationState = {
    notificationId : ''
}

// notificationSlice for store reducer
const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers : {}
})

const notificationReducer = notificationSlice.reducer;

export default notificationReducer
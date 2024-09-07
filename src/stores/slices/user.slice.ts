import { createSlice } from "@reduxjs/toolkit"

// userState type
interface UserState {
    userId : string
}

// initial value for userState
const initialState : UserState = {
    userId : ''
}

// userSlice for store reducer
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {}
})

const userReducer = userSlice.reducer;

export default userReducer
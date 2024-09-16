import { createSlice } from "@reduxjs/toolkit"

// wishListState type
interface wishListState {
    wishListId : string
}

// initial value for wishListState
const initialState : wishListState = {
    wishListId : ''
}

// wishListSlice for store reducer
const wishListSlice = createSlice({
    name : 'wishList',
    initialState,
    reducers : {}
})

const wishListReducer = wishListSlice.reducer;

export default wishListReducer
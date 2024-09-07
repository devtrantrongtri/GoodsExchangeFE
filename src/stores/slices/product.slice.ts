import { createSlice } from "@reduxjs/toolkit"

// userState type
interface productState {
    productId : string
}

// initial value for productState
const initialState : productState = {
    productId : ''
}

// productSlice for store reducer
const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {}
})

const productReducer = productSlice.reducer;

export default productReducer
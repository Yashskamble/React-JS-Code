import { createSlice } from "@reduxjs/toolkit";

const showCart = createSlice({
    name:'ui',
    initialState: {cartVisible: false},
    reducers: {
        toggleCart(state) {
            state.cartVisible = !state.cartVisible
        }
    }
})

export const showCartActions = showCart.actions
export default showCart.reducer
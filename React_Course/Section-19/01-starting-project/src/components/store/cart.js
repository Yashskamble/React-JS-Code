import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name:'ui',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItemstoCart(state, action){
            state.totalQuantity++
            const existingItem = state.items.find((item) => item.id === action.payload.item.id);
            if(!existingItem){
                state.items.push({ 
                    id: action.payload.item.id,
                    title: action.payload.item.title, 
                    quantity: 1, 
                    total: action.payload.item.price, 
                    price: action.payload.item.price 
                })
            }
            else {
                existingItem.quantity = existingItem.quantity + 1
                existingItem.total = existingItem.quantity * existingItem.price
            }
        },
        removeItemsFromCart(state,action){
            state.totalQuantity--
            const existingItem = state.items.find((item) => item.id === action.payload.item.id);
            if(existingItem.quantity === 1){
                state.items.splice(existingItem,1)
            }
            else {
                existingItem.quantity = existingItem.quantity - 1
                existingItem.total -= existingItem.price
            }
        }


    }
})

export const cartActions = cart.actions
export default cart.reducer
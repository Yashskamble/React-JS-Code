import { configureStore } from "@reduxjs/toolkit";
import showCart from "./showCart";
import cart from "./cart";

const store = configureStore({
    reducer : {ui : showCart, cart: cart}
})

export default store;
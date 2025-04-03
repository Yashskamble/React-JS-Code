import { createContext, useState , useReducer} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
 
export const CartContext = createContext({
    items: [],
    onAddItemToCart: () => {},
    updateItemQuantity: () => {}
});

function shoppingActionReducer(state, action) {
    if(action.type === "add-item"){
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
              id: action.payload.id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    } else if(action.type === "update-item"){
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    }
return state
}

export default function CartContextProvider ({children}) {

    const [ shoppingCartState, shoppingCartDispatch] = useReducer(shoppingActionReducer, {
        items: [],
      })
    
      function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'add-item', 
            payload: {
                id:id
            }
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'update-item', 
            payload: {
                productId: productId,
                amount: amount
            }
        });
      }
    
      const ctxtValue = {
        items : shoppingCartState.items,
        onAddItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
      }

    return <CartContext.Provider value={ctxtValue}>
        {children}
    </CartContext.Provider>

}



import React, { useContext } from 'react'
import CartContext from '../store/CartContext'
import Modal from '../UI/Modal';
import { currencyFormatter } from '../utils/formatting';
import Button from '../UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce((totalValue, item) => {
    return totalValue + item.quantity * item.price;
  }, 0)

  function handleCloseCart() {
    userProgressCtx.hideCart()
  }

  function handleMoveCheckout() {
    userProgressCtx.showCheckout()
  }
  
  return (
    <Modal className='cart' open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => 
            <CartItem 
                key={item.id} 
                item={item}
                onDecrease = {() => cartCtx.removeItem(item.id)}
                onIncrease = {() => cartCtx.addItem(item)}
            />
            )}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button onClick= {handleCloseCart} textOnly>Close</Button>
            {cartCtx.items.length > 0 && <Button onClick= {handleMoveCheckout}>Go to CheckOut</Button>}
        </p>
    </Modal>
  )
}

export default Cart
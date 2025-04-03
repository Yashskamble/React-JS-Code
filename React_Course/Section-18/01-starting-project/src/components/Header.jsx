import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

function Header() {
  const userProgressCtx = useContext(UserProgressContext)
  const cartCtx = useContext(CartContext);
  const totalItemsInCart = cartCtx.items.reduce((acc, item) => {
    return acc + item.quantity;
}, 0);

function handleShowCart() {
  userProgressCtx.showCart()
}

  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt='A restaurant image.'/>
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalItemsInCart})</Button>
        </nav>
    </header>
  )
}

export default Header
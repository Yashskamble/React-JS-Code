import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formatting'
import CartContext from '../store/CartContext'
import Input from '../UI/Input';
import Button from '../UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import Modal from '../UI/Modal';
import useHttp from '../hooks/useHttp';
import ErrorComponent from './ErrorComponent';


const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce((totalValue, item) => {
    return totalValue + item.quantity * item.price;
  }, 0)

  const {data, isError, isLoading, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)
  
  function handleClose() {
    userProgressCtx.hideCheckout()
  }

  function handleFinish(){
    userProgressCtx.hideCheckout()
    cartCtx.clearCart()
    clearData()
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries())
    console.log(customerData)

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData
      }
    }))
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isLoading) {
    actions = <p>Sending the form data...</p>
  }

  if(!isError && data) {
    return(
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>SUCCESSS!!!</h2>
        <p>You have successfully added the cart items and checked out.</p>
        <p>We will reach out you in short time via email.</p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>

      </Modal>
    )
  }
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        {isError && <ErrorComponent title="Failed to submit the data." errorCnt={isError}/>}
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label='Full Name' type='text' id='name'/>
            <Input label='E-mail Address' type='email' id='email'/>
            <Input label='Street' type='text' id='street'/>
            <div className='control-row'>
                <Input label='Postal Code' type='text' id='postal-code'/>
                <Input label='City' type='text' id='city'/>
            </div>
            <p className='modal-actions'>
                {actions}
            </p>
        </form>
    </Modal>
  )
}

export default Checkout
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { showCartActions } from '../store/showCart';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const handleToggle = () => {
    dispatch(showCartActions.toggleCart())
  }
  return (
    <button className={classes.button} onClick={handleToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;

import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../store/cart';

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatch = useDispatch()

  const addtoCart = () => {
    dispatch(cartActions.addItemstoCart({item: {title, price, description, id}}))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addtoCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

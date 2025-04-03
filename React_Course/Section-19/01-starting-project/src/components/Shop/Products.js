import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMYPRODUCTS = [
    {
      title: "My FIRST BOOK",
      price: 6,
      description: "This is a first Book - amazing!",
      id: 1,
    },
    {
      title: "My SECOND BOOK",
      price: 10,
      description: "This is a second Book - amazing!",
      id: 2,
    },
    {
      title: "My THIRD BOOK",
      price: 1,
      description: "This is a third Book - amazing!",
      id: 3,
    },
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite Books</h2>
      <ul>
        {DUMMYPRODUCTS.map((item => {
          return(
            <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
          )
          
        }))}
      </ul>
    </section>
  );
};

export default Products;

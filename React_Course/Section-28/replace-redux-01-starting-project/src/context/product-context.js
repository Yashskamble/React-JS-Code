import { createContext, useState } from "react";

const ProductContext = createContext(
  {
  products : [],
  onToggleFavHandler: () => {}
})

export default ProductContext;

export function ProductContextProvider({children}) {
    const [productList, setProductList] = useState([
        {
          id: 'p1',
          title: 'Red Scarf',
          description: 'A pretty red scarf.',
          isFavorite: false
        },
        {
          id: 'p2',
          title: 'Blue T-Shirt',
          description: 'A pretty blue t-shirt.',
          isFavorite: false
        },
        {
          id: 'p3',
          title: 'Green Trousers',
          description: 'A pair of lightly green trousers.',
          isFavorite: false
        },
        {
          id: 'p4',
          title: 'Orange Hat',
          description: 'Street style! An orange hat.',
          isFavorite: false
        }
      ])

    function onToggleFavHandler(id) {
      const favArray =  productList.map((product) => {
          if(product.id === id){
            return {...product, isFavorite: !product.isFavorite}
          }

          return {...product}
      })

      console.log(favArray)
      setProductList(favArray)
    }

    return <ProductContext.Provider value={{products: productList, onToggleFavHandler}}>
        {children}
    </ProductContext.Provider>
}
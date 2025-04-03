import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import productReducer from './store/reducers/products';
import { ProductContextProvider } from './context/product-context';

const rootReducer = combineReducers({
  shop: productReducer
});

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ProductContextProvider>);
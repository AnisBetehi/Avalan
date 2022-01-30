import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user';
import uiReducer from './ui';
import cartReducer from './cart';
import productsReducer from './products'




export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        ui: uiReducer,
        products: productsReducer   
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
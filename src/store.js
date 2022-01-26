import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user';
import uiReducer from './features/ui';
import cartReducer from './features/cart';
import productsReducer from './features/products'




export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        ui: uiReducer,
        products: productsReducer   
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
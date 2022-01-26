import { createSlice } from "@reduxjs/toolkit";
import { updateDataBase } from "../userDataUpdate";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        wishList: []
    },
    reducers: {
        addItemToCart: (state, {payload}) => {
            if (!payload.quantity || payload.quantity === 0) return state;
            const newState = {...state, items: [...state.items, { name: payload.name, id: payload.id, quantity: payload.quantity, price: payload.price, checkout: true, image: payload.image }]}
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
            return newState;
        },

        removeItemFromCart: (state, {payload}) => {
            const newState = {...state, items: state.items.filter(item => item.id !== payload.id)}
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
            return newState;
        },


        clearCart: (state, payload) => {
            const newState = {...state, items: []};
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
            return newState
        },

        resetCart: (state) => {
            return {...state, items: []};
        },


        updateCart: (state, {payload}) => {
            return {...state, items: [...payload.items]};
        },

        updateItemQuantity: (state, {payload}) => {
            const newState = {...state, items: state.items.map(item => {
                if (item.name === payload.name) return {...item, quantity: payload.quantity }
                return item;
            })}
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
            return newState;
        },

        addItemToWishList: (state, {payload}) => {
            const newState = {...state, wishList: [...state.wishList, { name: payload.name, id: payload.id, quantity: payload.quantity, price: payload.price, checkout: true, image: payload.image }]}
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: state.items, wishList: newState.wishList});
            return newState;
        },

        moveItemToWishList: (state, {payload}) => {
            const newState = {...state, items: state.items.filter(item => item.id !== payload.id), wishList: [...state.wishList, state.items.find(item => item.id === payload.id)]}
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: newState.wishList});
            return newState
        },

        removeItemFromWishList: (state, {payload}) => {
            const newState = {...state, wishList: state.wishList.filter(item => item.id !== payload.id)};
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: state.items, wishList: newState.wishList});
            return newState;
        },


        moveItemToCart: (state, {payload}) => {
            const newState = {...state, wishList: state.wishList.filter(item => item.id !== payload.id), items: [...state.items, state.wishList.find(item => item.id === payload.id)]};
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: newState.wishList});
            return newState;
        },


        updateWishList: (state, {payload}) => {
            return {...state, wishList: [...payload.wishList]}
        },



        clearWishList: (state, {payload}) => {
            const newState = {...state, wishList: []};
            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: state.items, wishList: newState.wishList});
            return newState
        },

        resetWishList: (state) => {
            return {...state, wishList: []};
        },

        toggleItemCheckout: (state, {payload}) => {
            const newState = {...state, items: state.items.map(item => {
                if (item.id === payload.id) return {...item, checkout: !item.checkout};
                return item;
            })}

            payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
            return newState;
        },


        toggleAllItemsCheckout: (state, {payload}) => {
           const newState = {...state, items: state.items.map(item => {
               return {...item, checkout: !item.checkout};
           })}

           
           payload.user.name && updateDataBase(payload.user, 'usersData', 'cart', {items: newState.items, wishList: state.wishList});
           return newState;
        }


    }
})


export const {addItemToCart, removeItemFromCart, clearCart, updateCart, updateItemQuantity, addItemToWishList, moveItemToWishList, removeItemFromWishList, moveItemToCart, updateWishList, toggleItemCheckout, toggleAllItemsCheckout, clearWishList, resetCart, resetWishList} = cartSlice.actions;


export default cartSlice.reducer;
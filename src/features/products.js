import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";


export const getProducts = createAsyncThunk('prooducts/getProducts', async () => {  
        const productsRef = collection(db, "Products");
        console.log('running');
        const data = await getDocs(productsRef);
        const prods = [];
        data.forEach(doc => {
            prods.push(doc.data());
        })
        return prods;     
    
})


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null
    },

    reducers: {
        setProducts: (state, {payload}) => {
            state.products = payload.products;
        }
    },

    extraReducers: {
        [getProducts.pending] : (state) => {
            state.status = 'loading';
        },

        [getProducts.fulfilled] : (state, {payload}) => {
            state.status = 'success';
            state.products = payload;
        },
        
        [getProducts.rejected]: (state) => {
            state.status = 'failed';
        }
    }
})

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;
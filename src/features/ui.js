import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: true
    },
    reducers: {
        toggleLoading: (state, {payload}) => {
            state.loading = payload.loading;
        }
    }


})



export const {toggleLoading} = uiSlice.actions;


export default uiSlice.reducer;
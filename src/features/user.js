import { createSlice } from "@reduxjs/toolkit"
import { auth } from "../firebase/firebase-config";


const userSlice = createSlice({
    name: 'user',
    initialState: {
       name: undefined,
       email: undefined,
       id: undefined,
    },

    reducers: {
        setUser: (state, {payload}) => {
            return {name: payload.userName, email: payload.currentUser.email, id: payload.currentUser.uid}
        },
        logOutUser: () => {
            auth.signOut();
            return {name: undefined, email: undefined, id: undefined};
        }
    }
})


export const {setUser, logOutUser} = userSlice.actions;


export default userSlice.reducer
import React, { useEffect } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import styled from 'styled-components';
import { auth, db} from './firebase-config';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './features/user';
import { updateCart, updateWishList } from './features/cart';
import { toggleLoading } from './features/ui';
import { getProducts } from './features/products';



export const updateDataBase = async (user, collection, field, value) => { 
    console.log(field, value)
    await updateDoc(doc(db, collection, user.id), {
        [field]: value
    });    

}

export const Wrapper = ({children}) => {


    const {ui} = useSelector(state => state);

    const dispatch = useDispatch();
    
    const updateUserData = async (currentUser, currentUserid) => {
        const docRef = doc(db, "usersData", currentUserid);
        const docSnap = await getDoc(docRef);
        dispatch(setUser({currentUser, userName: docSnap.data().name}));

        dispatch(updateCart({items: docSnap.data().cart.items}));
        dispatch(updateWishList({wishList: docSnap.data().cart.wishList}));
        dispatch(toggleLoading({loading: false}));
    }

    useEffect(() => {
        onAuthStateChanged(auth,(currentUser) => {
            if(currentUser) {
                // console.log(currentUser);
                updateUserData(currentUser, currentUser.uid);
            } else {
                dispatch(toggleLoading({loading: false}));
            }
        })

        dispatch(getProducts());
    }, [])

    
    return (
        <>
            {ui.loading? <Img src='https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/Loader.gif?alt=media&token=64b60939-f8cf-4a1e-b9a1-a45077f9d451' />: children} 
        </>
    )


}



const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
`
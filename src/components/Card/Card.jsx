import React, {useState } from 'react';
import styled from 'styled-components';
import {TiTick} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, addItemToWishList } from '../../features/cart';



const Card = ({ category, name, price, image, id }) => {

    const [quantity, setQuantity] = useState(0);
    let navigate = useNavigate();

    const {cart} = useSelector(state => state);
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    const addItem = (e) => {
        e.preventDefault();             
            quantity && dispatch(addItemToCart({ name, id, quantity, price, image, user }));
    }


    const goToItemDetail = (category, id) => {
        navigate(`/products/${category}/${id}`)
    }

    return (
        <StyledCard>
            <CardImage onClick={() => goToItemDetail(category, id)} src={image} alt="" />
            <CardPrice>${price}</CardPrice>
            <div>
                <CardTitle>{name}</CardTitle>
                {cart.items.some(item => item.name === name) ? <InCart onClick={() => navigate('/cart')}><h1>In Cart</h1><TiTick/></InCart> : cart.wishList.some(item => item.name === name) ?
                <InCart interests onClick={() => navigate('/wishlist')}><h1>in Wish list</h1><TiTick/></InCart> :
                <form onSubmit={addItem}>
                    <InputContainer>
                        <QuantityInput>
                            <h1 onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</h1>
                            <h1>{quantity || 0}</h1>
                            <h1 onClick={() => quantity < 998 && setQuantity(quantity + 1)}>+</h1>
                        </QuantityInput>
                        <Button type='submit'>Add to Cart</Button>
                        <AiOutlineHeart onClick={() => dispatch(addItemToWishList({ name, id, quantity: 1, price, image, user }))} class='heart'/>
                    </InputContainer> 
                </form>               
                }
            </div>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    width: 19em;
    height: 25em;
    overflow: hidden;
    padding: 1.1em.95em;
    /* flex-shrink: 0; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: white;
    position: relative;
    text-align: left;
    text-align: center;
    box-shadow: 0 0 1.1em rgba(0, 0, 0, .3);
    font-size: 1rem;

    > div {
        height: 9.5em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 700px) {
    
        input {
            width: 25px;
        }
    }

    
    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.7rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.5rem;
    }

    @media(min-width: 4000px) {
        font-size: 2.8rem;
    }

    @media(min-width: 5000px) {
        font-size: 3.5rem;
    }
`

const CardImage = styled.img`
    width: 100%;
    height: 50%;
    object-fit: contain;
    position: absolute;
    top: .6em;
    left: 0;
    cursor: pointer;
`

const CardPrice = styled.h5`
    padding: .6em .95em;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: .95em;
    border-radius: .4em;
    position: absolute;
    left: .95em;
    top: 1.1em;
`

const CardTitle = styled.h1`
    font-size: .9em; 
    text-align: left;
    margin-top: 1.1em;
    color: ${({theme}) => theme.upperHeader};
`

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 auto;
    gap: .4em;
    position: relative;

    .heart {
        position: absolute;
        top: 0px;
        right: 0;
        font-size: 1.7em;
        cursor: pointer;
        color: ${({theme}) => theme.main};
        transition: .3s ease;

        &:hover {
            transform: scale(1.1);
        }
    }

`

const Button = styled.button`
    width: 100%;
    padding: .6em .9em;
    outline: none;
    border: none;
    background-color: ${({theme}) => theme.main};
    color: white;
    cursor: pointer;
    font-size: .9em;
`

export const QuantityInput = styled.div`
    display: flex;
    justify-content: center;
    height: 1.1em;
    width: 100%;
    margin-bottom: .95em;

    > h1 {
        font-size: 1.1em;
        padding: 0 .6em;
        color: ${({theme}) => theme.upperHeader};
    }

    > h1:first-child, > h1:last-child {
        cursor: pointer;
        user-select: none;
    }
    
`

const InCart = styled.div`
    width: 100%;
    height: 3em;
    background-color: #0eca0e;
    color: white;
    display: grid;
    place-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        filter: brightness(90%);
    }
    
    h1 {
        font-size: .95em;
        padding: 0 .4em;
    }

    svg {
        transform: scale(1.5);
    }

    @media(max-width: 700px) {
        
    }
`

export default Card

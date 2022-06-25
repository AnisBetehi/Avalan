import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { addItemToCart } from '../../features/cart';


const ItemDetail = () => {

    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const {products} = useSelector(state => state);
    const {cart} = useSelector(state => state);
    const {user} = useSelector(state => state);
    const addItem = (name, id, quantity, price, image, user) => {          
            quantity && dispatch(addItemToCart({ name, id, quantity, price, image, user }));
    }

    const navigate = useNavigate();



    return (  
        <DetailContainer>
            {products.products.filter(item => item.id === id).map(item => {
                return (
                    <>
                        <img alt='img' src={item.imageUrl}/>
                        <h1>{item.title.toUpperCase()}</h1>
                        <h3>${item.price}</h3>
                        <p>{item.description}</p>
                        {cart.items.find(item => item.id === id) ? <Added onClick={() => navigate('/cart')} >in cart</Added> : cart.wishList.find(item => item.id === id) ? <Added onClick={() => navigate('/wishlist')}>In wish list</Added> : <AddToCart onClick={() => addItem(item.title, item.id, 1, item.price, item.imageUrl, user)} >Add to Cart</AddToCart>}
                    </>
                    )  
            })}                   
        </DetailContainer>         
    )
}


const DetailContainer = styled.section`

    display: grid;
    margin-block: 3em;
    padding: 2em;
    gap: 1.7em;
    width: 100%;
    grid-auto-rows: auto;
    overflow: hidden;
    font-size: 1rem;



    h1 {
        color: ${({theme}) => theme.main};
        font-weight: bolder;
        font-size: 1.1em;
    }

    img {
        align-self: center;
        justify-self: center;
        width: 100%;
        max-height: 17em;
        object-fit: contain;
    }

    p {
        font-size: .95em;
        line-height: 1.1em;
    }

    h3 {
        grid-row: 4/5;
    }


  @media(min-width: 65em) {
        width: 80%;
        margin-inline: auto;
        grid-template-areas: 
            'img title'
            'img description'
            'img price'
            'img button'
            
        ;
        gap: 1.1em;
        column-gap: 3em;


        img {
            width: 90%;
            grid-area: img;
            grid-column: 1 / 2;
        }

        h1 {
            grid-area: title;
            font-size: 1.2em;
        }

        h3 {
            grid-area: price;
        }

        p {
            grid-area: description;
            font-size: .95em;
            line-height: 1.5em;
        }

        button {
            grid-area: button;

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
        font-size: 3.5em;
    }
`

const Added = styled.button`
    padding: .6em 1.7em;
    width: 12em;
    height: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .15em;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    border: none;

`

const AddToCart = styled.button`
    padding: .6em 1.7em;
    width: 12em;
    height: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .15em;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    border: none;
`
export default ItemDetail

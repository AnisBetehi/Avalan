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
    margin-block: 50px;
    padding: 2rem;
    gap: 30px;
    width: 100%;
    grid-auto-rows: auto;
    overflow: hidden;



    h1 {
        color: ${({theme}) => theme.main};
        font-weight: bolder;
        font-size: 20px;
    }

    img {
        align-self: center;
        justify-self: center;
        width: 100%;
        max-height: 300px;
        object-fit: contain;
    }

    p {
        font-size: 15px;
        line-height: 20px;
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
        gap: 20px;
        column-gap: 50px;


        img {
            width: 90%;
            grid-area: img;
            grid-column: 1 / 2;
        }

        h1 {
            grid-area: title;
            font-size: 22px;
        }

        h3 {
            grid-area: price;
        }

        p {
            grid-area: description;
            font-size: 14px;
            line-height: 25px;
        }

        button {
            grid-area: button;

        }
    
  }
`

const Added = styled.button`
    padding: 10px 30px;
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    border: none;

`

const AddToCart = styled.button`
    padding: 10px 30px;
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    border: none;
`
export default ItemDetail

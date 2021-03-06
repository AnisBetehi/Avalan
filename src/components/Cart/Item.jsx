import styled from 'styled-components';
import {QuantityInput} from '../Card/Card';
import {IoMdRemoveCircle} from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeItemFromCart, updateItemQuantity, moveItemToWishList, toggleItemCheckout } from '../../features/cart';
import { useNavigate } from 'react-router-dom';



const Item = ({name, quantity, checkout, price, image, id, category}) => {

   const dispatch = useDispatch();
   const {user} = useSelector(state => state);

   const navigate = useNavigate();


   const goToItemDetail = (category, id) => {
    navigate(`/products/${category}/${id}`)
}

    return (
        <ItemContainer>
            <RemoveButton onClick={() => dispatch(removeItemFromCart({id, user}))}><IoMdRemoveCircle /></RemoveButton>
            <ItemTitle>
                <ItemImage onClick={() => goToItemDetail(category, id)} src={image}/>
                <DetailsContainer>
                    <Title onClick={() => goToItemDetail(category, id)}>{name}</Title>  
                    <h5 onClick={() => dispatch(moveItemToWishList({id, user}))}>Move to Wish list</h5>
                    <CheckBox type='checkbox' id='checkbox' checked={checkout} onChange={() => dispatch(toggleItemCheckout({id, user}))}/>
                    <label htmlFor='checkbox'>Checkout</label>
                </DetailsContainer>                              
            </ItemTitle>
            <ItemPrice>
                ${price}
            </ItemPrice>
            <ItemQuantity>
                <Quantity>
                    <h1 onClick={() => quantity > 1 && dispatch(updateItemQuantity({name, id, quantity: quantity - 1, user}))}>-</h1>
                    <h1>{quantity || 0}</h1>
                    <h1 onClick={() => dispatch(updateItemQuantity({name, id, quantity: quantity + 1, user}))}>+</h1>
                </Quantity>
            </ItemQuantity>
            <Total>
                Total: ${parseInt(Math.ceil(price * quantity))}
            </Total>
        </ItemContainer>
    )
}



const ItemContainer = styled.div`
    min-height: 12em;
    min-width: 80%;
    margin-bottom: 3em;
    position: relative;
    display: grid;
    overflow: hidden;
    place-items: center;
    align-content: center;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    box-shadow: .6em .6em .95em rgba(171, 169, 176, .1);
    font-size: 1rem;
    

    @media(max-width: 1000px) {
        grid-template-columns: 1fr 1fr 1fr;
        padding: 50px 10px 20px;
    }

    @media(max-width: 700px) {       
        width: 90%;
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
        font-size: 3.6rem;
    }
`
const ItemTitle = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    cursor: pointer;
    grid-template-columns: 2fr 1fr;
    align-items: center;


    @media(max-width: 1000px) {
        grid-template-columns: 1fr 2fr;
        grid-column: 1/4;
    }

    @media(max-width: 700px) {
        margin-bottom: 20px;
    }    

    
`

const DetailsContainer = styled.div`
    > h5 {
        color: ${({theme}) => theme.main};
        margin: .6em 0;
        font-size: .8em;
        cursor: pointer;
    }

    > label {
        font-size: .85em;
        padding: 0 .4em;
        color: gray;
        cursor: pointer;
        user-select: none;
    }

    @media(max-width: 700px) {
        padding-left: 10px;
        > h5 {
            font-size: 12px;
        }

        > label {
            font-size: 10px;
        }
    }   


`

const Title = styled.h3`
    font-size: .8em;
    line-height: 1.05em;

    @media(max-width: 700px) {
        font-size: 12px;
    }   
`

const ItemImage = styled.img`
    height: 60%;
    width: 9.5em;
    object-fit: contain;
    justify-self: center;
    cursor: pointer;

    @media(max-width: 700px) {
         justify-self: flex-start;
        width: 100%;
    }   
`

const ItemQuantity = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`

const Quantity = styled(QuantityInput)`
    margin: 0;

    @media(max-width: 700px) {
        > h1 {
            font-size: 14px;
            padding: 0 5px;
        }
    } 
   
`

const ItemPrice = styled.h4`
     width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
      @media(max-width: 700px) {
        font-size: 12px;
    } 

`

const Total = styled.h4`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
      @media(max-width: 700px) {
        font-size: 12px;
    } 

`

const CheckBox = styled.input`

    margin-inline: .15em;

    @media(min-width: 1700px) {
        transform: scale(1.3);
    }

    @media(min-width: 2000px) {
        transform: scale(1.7);
    }

    @media(min-width: 2800px) {
        transform: scale(2);
    }

    @media(min-width: 4000px) {
        transform: scale(3);
    }

    @media(min-width: 5000px) {
        transform: scale(4);
    }
`

const RemoveButton = styled.h4`
    position: absolute;
    top: .95em;
    right: .95em;
    cursor: pointer;
    font-size: 1.7em;
    transition: .3s ease;
    z-index: 100;

    &:hover {
        transform: scale(1.1);
    }
`


export default Item

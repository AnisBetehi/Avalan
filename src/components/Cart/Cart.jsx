import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Item from './Item';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BiSearchAlt} from 'react-icons/bi';
import { useSelector} from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';



const Cart = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const {cart} = useSelector(state => state);
    const [items, setItems] = useState([]);

    useEffect(() => {
      setItems([...cart.items].reverse());
    }, [cart]);
    

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
        window.scroll(0, 10);
    }



    const navigate = useNavigate();

    return (
        <>
        <CartContainer>
                <SearchContainer>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search cart' />
                    <BiSearchAlt/>
                </SearchContainer>
                <ShoppingCart>
                    <TitleContainer>
                        <Title>Your shopping cart</Title>
                        <CartLength>{cart.items.length === 1 ? cart.items.length + ' item' : cart.items.length + ' items'}</CartLength>
                    </TitleContainer>

                    <ItemsContainer>
                            {items.filter(item => item.name.toUpperCase().includes(search.toUpperCase())).slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4).map(item => {
                                return (
                                    <Item 
                                    key={item.id} 
                                    image={item.image} 
                                    name={item.name} 
                                    quantity={item.quantity} 
                                    checkout={item.checkout}
                                    price={item.price}
                                    id={item.id}
                                    category={item.category}
                                    />
                                )
                            })}
                    </ItemsContainer>           
                </ShoppingCart>
               {cart.items.length > 0 && <Checkout onClick={() => navigate('/checkout')}>
                    <h4>Checkout</h4> 
                    <AiOutlineArrowRight />                  
                </Checkout>}
        </CartContainer>

        <Pagination>
                <ReactPaginate
                                containerClassName='pagination-container'
                                pageLinkClassName='page-link'
                                activeLinkClassName='active-page-link'
                                previousLinkClassName='previous-page-link'
                                nextLinkClassName='next-page-link'
                                breakLabel="..."
                                breakLinkClassName='break-link'
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageCount={cart.items.length / 4}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                />  
        </Pagination>        
        </>
    )
}


const CartContainer = styled.div`
    width: 80%;
    display: flex;
    margin: 20px auto 0;
    min-height: 250px;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;


    @media(max-width: 700px) {
       width: 95%;
    }
`


const SearchContainer = styled.div`
        align-self: center;
        display: flex;
        align-items: center;
        width: 40%;
        border: 1px solid rgba(0, 0, 0, .2);
        padding: .5rem 1rem;


        input {
            outline: none;
            border: none;
            flex: 3;
        }

        svg {
            cursor: pointer;
        }

        @media(max-width: 800px) {
            width: 100%;
        }
`

const ShoppingCart = styled.div`
`

const Pagination = styled.div`
    .pagination-container {
        width: 100vw;
        background-color: ${({theme}) => theme.main};
        color: white;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        padding: 1rem;
        list-style: none;
        margin-top: 40px;

        li {
            user-select: none;
        }

        .page-link {
            font-size: 12px;
            font-weight: 900;
            margin: 0 15px;
            cursor: pointer;
        }

        .active-page-link {
            border: 2px solid white;
            border-radius: 50%;
            color: white;
            padding: 10px 15px;
            
        }

        .previous-page-link, .next-page-link {
            cursor: pointer;
            font-size: 20px;
            color: white;
            font-weight: 900;
        }

        .previous-page-link {
            margin-right: 20px;
            padding: 5px;
        }

        .next-page-link {
            margin-left: 20px;
            padding: 5px;
        }

        .break-link {
            cursor: pointer;
            padding: 0 20px;
        }

    }
`

const TitleContainer = styled.div`
    width: 80%;
    padding: 20px 10px;
`

const Title = styled.h2`
    padding: 10px 0;

    @media(max-width: 700px) {
        font-size: 15px;
    }  

`

const CartLength = styled.h4`

    @media(max-width: 700px) {
        font-size: 13px;
    }  

`


const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;


    @media(max-width: 700px) {
        align-items: center;
    }
    
`

const Checkout = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: red;
    gap: 10px;
    font-size: 14px;
    cursor: pointer;
    width: 100%;

    @media(max-width: 800px){
        width: 95%;
    }
`


export default Cart

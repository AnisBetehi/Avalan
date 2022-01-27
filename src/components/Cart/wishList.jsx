import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';
import ReactPaginate from 'react-paginate';
import {IoMdRemoveCircle} from 'react-icons/io';
import {BiSearchAlt} from 'react-icons/bi';
import { moveItemToCart } from '../../features/cart';
import { useNavigate } from 'react-router-dom';
import { removeItemFromWishList } from '../../features/cart';


const WishList = () => {

    const {cart} = useSelector(state => state);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
        window.scroll(0, 200);
    }

    useEffect(() => {
      setItems([...cart.wishList].reverse());
    }, [cart.wishList]);
    

    const goToItemDetail = (category, id) => {
        navigate(`/products/${category}/${id}`)
    }

  

    return (

        <>
        <OuterContainer>
            <SearchContainer>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search wishlist' />
                <BiSearchAlt/>
            </SearchContainer>
            <TitleContainer>
                    <Title>Your WishList</Title>
                    <WishListLength>{cart.wishList.length === 1 ? cart.wishList.length + ' item' : cart.wishList.length + ' items'}</WishListLength>
            </TitleContainer>
            <Container>         
                {items.filter(item => item.name.toUpperCase().includes(search.toUpperCase())).slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4).map(item => {
                    return (
                        <StyledCard key={item.id}>
                            <RemoveButton onClick={() => dispatch(removeItemFromWishList({id: item.id, user}))}><IoMdRemoveCircle /></RemoveButton>
                            <CardImage onClick={() => goToItemDetail(item.category, item.id)} src={item.image} alt="" />
                            <CardPrice>${item.price}</CardPrice>
                            <div>
                                <CardTitle>{item.name}</CardTitle>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(moveItemToCart({id: item.id, user, quantity: 1}));
                                }}>
                                    <InputContainer>
                                        <Button type='submit'>Move to Cart</Button>
                                    </InputContainer> 
                                </form>                                   
                            </div>
                        </StyledCard>            
                    )
                })}
                
            </Container>
         </OuterContainer>
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
                                pageCount={cart.wishList.length / 4}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                />  
            </Pagination> 
            
        </>
    )
}



export default WishList;




const OuterContainer = styled.section`
    width: 100%;
    min-height: 250px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 40px;
`

const SearchContainer = styled.div`
        align-self: center;
        display: flex;
        align-items: center;
        width: 32%;
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
            width: 95%;
        }
`

const Container = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    @media(min-width: 40em) {
        width: 80%;
        margin-inline: auto;
        flex-direction: row;
    }

`

const TitleContainer = styled.div`
    width: 80%;
    padding: 0 10px;
`

const Title = styled.h2`
    padding: 10px 0;

    @media(max-width: 700px) {
        font-size: 15px;
    }  

`

const WishListLength = styled.h4`

    @media(max-width: 700px) {
        font-size: 13px;
    }  

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

const StyledCard = styled.div`
    width: 300px;
    height: 400px;
    overflow: hidden;
    padding: 20px 15px;
    /* flex-shrink: 0; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: white;
    position: relative;
    text-align: left;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, .3);

    > div {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

const CardImage = styled.img`
    width: 100%;
    height: 50%;
    object-fit: contain;
    position: absolute;
    top: 10px;
    left: 0;
    cursor: pointer;
`
const InputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 auto;

`
const CardPrice = styled.h5`
    padding: 10px 15px;
    background-color: ${({theme}) => theme.main};
    color: white;
    font-size: 15px;
    border-radius: 5px;
    position: absolute;
    left: 15px;
    top: 20px;
`

const CardTitle = styled.h1`
    font-size: 14px; 
    text-align: left;
    margin-top: 20px;
    color: ${({theme}) => theme.upperHeader};
`


const Button = styled.button`
    width: 100%;
    padding: 10px 15px;
    outline: none;
    border: none;
    background-color: ${({theme}) => theme.main};
    color: white;
    cursor: pointer;
`

const RemoveButton = styled.h4`
    position: absolute;
    top: 15px;
    right: 10px;
    color: ${({theme}) => theme.main};
    cursor: pointer;
    font-size: 1.7rem;
    transition: .3s ease;
    z-index: 100;

    &:hover {
        transform: scale(1.1);
    }
`



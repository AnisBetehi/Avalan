import React from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';
import { useSelector} from 'react-redux';


const Products = ({category}) => {

    const {products} = useSelector(state => state);

    
    return (
        <StyledSection id='main'> 
                {category && products.products.length > 0 ? products.products.filter(product => product.category === category).map(product => {
                    return (
                        <Card key={product.id} category={product.category} name={product.title} price={product.price} image={product.imageUrl} id={product.id}/>
                    )
                }) : products.products.length > 0 ? products.products.map(product => {
                    return (
                        <Card key={product.id} category={product.category} name={product.title} price={product.price} image={product.imageUrl} id={product.id}/>
                    )
                }) : <img alt='loader' src='https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/Loader.gif?alt=media&token=64b60939-f8cf-4a1e-b9a1-a45077f9d451' />}
        </StyledSection>  
        
    )
}


const StyledSection = styled.section`
    width: 100%;
    margin: 0 auto;
    min-height: 12em;
    position: relative;
    padding: 1.7em;
    padding-top: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1.1em;
    font-size: 1rem;




    > img {
        width: 3em;
        position: absolute;
        top: 50%;
        left: 50%:
        transform: translate(-50%, -50%);
    }


    @media(min-width: 40em) {
        flex-direction: row;
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
        font-size: 3.5em;
    }

`

export default Products;

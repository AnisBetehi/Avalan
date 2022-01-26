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
    min-height: 200px;
    position: relative;
    padding: 30px;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;




    > img {
        width: 50px;
        position: absolute;
        top: 50%;
        left: 50:
        transform: translate(-50%, -50%);
    }


    @media(min-width: 40em) {
        flex-direction: row;
        width: 90%;
    }

`

export default Products;

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AiOutlineArrowRight} from 'react-icons/ai';

const ProductsPreview = () => {


    const {products} = useSelector(state => state);

    const navigate = useNavigate();

  return (
      <>
        <PreviewContainer>
            <h4>NEW ARRIVALS <span onClick={() => navigate('/products')}>SHOP NOW <AiOutlineArrowRight /></span></h4>
            <div>
                {products.products.filter(item => item.category === 'women clothing').slice(0, 5).map(product => {
                    return (
                        <div key={product.id}>
                            <img onClick={() => navigate(`/products/${product.category}/${product.id}`)} src={product.imageUrl} alt="" />
                            <h4>{product.title}</h4>
                        </div>
                    )
                })}
            </div>
        </PreviewContainer>
        <PreviewContainer>
            <h4>TRENDING<span onClick={() => navigate('/products')}>SHOP NOW <AiOutlineArrowRight /></span></h4>
            <div>
                {products.products.filter(item => item.category === 'men clothing').slice(0, 5).map(product => {
                    return (
                        <div key={product.id}>
                            <img onClick={() => navigate(`/products/${product.category}/${product.id}`)} src={product.imageUrl} alt="" />
                            <h4>{product.title}</h4>
                        </div>
                    )
                })}
            </div>
        </PreviewContainer>
        <Line>

        </Line>
      </>
  );
};

export default ProductsPreview;


const Line = styled.section`
    height: 2px;
    width: 100%;
    background-color: ${({theme}) => theme.upperHeader};
`

const PreviewContainer = styled.section`
    min-height: 2.5em;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5em;
    padding-block: 3em;
    font-size: 1rem;

    > h4 {
        display: flex;
        justify-content: space-between;
        align-self: center;
        border-bottom: .1em solid rgba(0, 0, 0, .4);
        width: 90%;
        padding-bottom: .6em;
        font-weight: 100;

        span {
            font-size: .8em;
            color: ${({theme}) => theme.main};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: .4em;
        }
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        height: 85%;
        gap: .4em;
        row-gap: 3.4em;

        @media(max-width: 500px) {
            flex-direction: column;
            gap: 0;
        }

        div {
            height: 19.5em;
            width: 15em;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
           

            img {
                width: 80%;
                height: 15em;
                object-fit: cover;
                cursor: pointer;
            }

            h4 {
                font-size: .9em;
                font-weight: 100;
                margin-top: .6em;
                padding-inline: .6em;
            }
        }
    }

    @media(max-width: 800px) {
        width: 100%;
    }

    @media(max-width: 1250px) {
        grid-template-columns: 1fr;
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

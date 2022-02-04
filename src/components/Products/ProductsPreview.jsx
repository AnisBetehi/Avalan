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
    min-height: 400px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding-block: 3rem;

    > h4 {
        display: flex;
        justify-content: space-between;
        align-self: center;
        border-bottom: 1px solid rgba(0, 0, 0, .4);
        width: 90%;
        padding-bottom: 10px;
        font-weight: 100;

        span {
            font-size: 12px;
            color: ${({theme}) => theme.main};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        height: 85%;
        gap: 5px;
        row-gap: 60px;

        @media(max-width: 500px) {
            flex-direction: column;
            gap: 0;
        }

        div {
            height: 340px;
            width: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
           

            img {
                width: 80%;
                height: 250px;
                object-fit: cover;
                cursor: pointer;
            }

            h4 {
                font-size: 14px;
                font-weight: 100;
                margin-top: 10px;
                padding-inline: 10px;
            }
        }
    }

    @media(max-width: 800px) {
        width: 100%;
    }


`

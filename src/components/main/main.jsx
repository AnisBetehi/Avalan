import React from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <>
        <MainContainer>
            <TextContainer>
                <h1>JOIN AVALAN'S AFFILIATE PROGRAM</h1>
                <p>Raise funds for your charitable organization or earn extra cash with your blog, social media account or engaging website. 

Affiliate marketing with Avalan is super easy. Just sign up and share our site with your followers and supporters. We do the rest. Our software tracks all the purchases made online and sends you a percentage of the sales! </p>
                <button>JOIN NOW</button>
            </TextContainer>
            <ImagesContainer>
                <div>
                    <img src='https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/pleased-smiling-redhead-woman-points-finger-copy-space-shows-special-offer-shopping-sale-recommends-good-discount-dressed-stylish-blue-outfit-has-happy-mood-breaks-through-paper-hole.jpg?alt=media&token=08713339-bbaf-4e21-b94c-8044d3905fd3' alt="" />
                    <img src='https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/shocked-two-women-friends-holding-shopping-bags-using-mobile-phone.jpg?alt=media&token=5690b564-f782-49d9-9e2a-f3fc0f467935' alt="" />
                </div>
            </ImagesContainer>
        </MainContainer>
        <Line>

        </Line>
    </>

    );
};

export default Main;


const MainContainer = styled.main`
    width: 80%;
    margin: 0 auto;
    min-height: 550px;
    padding-block: 4rem;
    display: grid;
    align-content: center;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr 400px;
    gap: 50px;

    @media(max-width: 1250px) {
        grid-template-columns: 1fr;
    }
`

const TextContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    h1 {
        color: ${({theme}) => theme.main};
        font-size: 35px;

        @media(max-width: 700px) {
            font-size: 30px;
        }
    }

    button {
        background-color: ${({theme}) => theme.main};
        color: white;
        outline: none;
        border: none;
        padding-block: 1rem;
        cursor: pointer;
        width: 200px;
    }

    p {
        font-size: 15px;
        font-weight: 400;
    }
`
const ImagesContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        position: relative;
        height: 100%;
        width: 90%;


        @media(max-width: 1250px) {
            width: 70%;
        }

        @media(max-width: 700px) {
            width: 100%;
        }


    }
    img {
        height: 80%;
        width: 350px;
        object-fit: cover;
        position: absolute;
        bottom: 0;
        right: 20px;

        @media(max-width: 500px) {
            width: 200px;
        }
    }

    img:first-child {
        left: 0;
        top: 0;
    }

    img:last-child {
        right: 0;
        bottom: 0;
    }
`

const Line = styled.section`
    height: 5px;
    width: 100%;
    background-color: ${({theme}) => theme.upperHeader};
`
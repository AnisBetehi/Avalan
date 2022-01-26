import React from 'react';
import styled from 'styled-components';
import Letterimg from '../../images/Newsletter.png'

const NewLetter = () => {
  return (
      <NewsLetterContainer>
        <img src={Letterimg} alt="" />
        <div>
            <h5>Subscribe to our newsletter</h5>
            <input type="email" placeholder='Enter your email' />
            <button>SUBSCRIBE</button>
        </div>
      </NewsLetterContainer>
  )
};

export default NewLetter;

const NewsLetterContainer = styled.section`
    width: 90%;
    margin: 50px auto;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 1rem 2rem;

    img {
        width: 400px;

        @media(max-width: 800px) {
            width: 300px;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 20px; 

        h5 {
            font-size: 30px;
            color: ${({theme}) => theme.main};
        }

        input {
            outline: none;
            border: none;
            border-bottom: 1px solid black;
            padding-block: .5rem;
        }

        button {
            background-color: ${({theme}) => theme.main};
            border: none;
            outline: none;
            padding-block: 10px;
            color: white;
            cursor: pointer;
        }
    }


    @media(max-width: 700px) {
        width: 85%;
        flex-direction: column;

       div {
           h5 {
               font-size: 25px;
           }
       }
    }
`


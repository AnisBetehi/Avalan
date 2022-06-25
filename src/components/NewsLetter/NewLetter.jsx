import React from 'react';
import styled from 'styled-components';

const NewLetter = () => {
  return (
      <NewsLetterContainer>
        <img src='https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/Newsletter.png?alt=media&token=1d118431-7a32-4662-b62e-d83b266d7b8f' alt="" />
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
    min-height: 17em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 1em 2em;
    font-size: 1rem;

    img {
        width: 25em;

        @media(max-width: 800px) {
            width: 300px;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 1.1em; 

        h5 {
            font-size: 1.7em;
            color: ${({theme}) => theme.main};
        }

        input {
            outline: none;
            border: none;
            border-bottom: .1em solid black;
            padding-block: .5em;
            font-size: .9em;
        }

        button {
            background-color: ${({theme}) => theme.main};
            border: none;
            outline: none;
            padding-block: .6em;
            color: white;
            cursor: pointer;
            font-size: .8em;
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


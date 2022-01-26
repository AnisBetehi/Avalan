import React from 'react';
import styled from 'styled-components';

const Hero = () => {
    return (
        <HeroContainer>
        </HeroContainer>
    )
}


const HeroContainer = styled.section`
    background: linear-gradient( rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.3) ), url('https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/cheerful-guy-with-helmet-shopping-bags-driving-yellow-scooter.jpg?alt=media&token=3215e24b-cde1-4816-9718-2599b1b9f6ad');
    background-size: cover;
    height: 100vh;
    background-position: center;
  
`


export default Hero

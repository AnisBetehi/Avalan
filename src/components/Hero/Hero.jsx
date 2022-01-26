import React from 'react';
import styled from 'styled-components';

const Hero = () => {
    return (
        <HeroContainer>
        </HeroContainer>
    )
}


const HeroContainer = styled.section`
    background: linear-gradient( rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.3) ), url('https://firebasestorage.googleapis.com/v0/b/e-commerce-9c9e9.appspot.com/o/cheerful-guy-with-helmet-shopping-bags-driving-yellow-scooter.jpg?alt=media&token=46a3d297-eb37-4893-aa88-b4e5033707f2');
    background-size: cover;
    height: 100vh;
    background-position:center;
  
`


export default Hero

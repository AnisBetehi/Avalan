import React from 'react';
import styled from 'styled-components';
import HeroImg from '../../images/cheerful-guy-with-helmet-shopping-bags-driving-yellow-scooter.jpg'

const Hero = () => {
    return (
        <HeroContainer background={HeroImg}>
        </HeroContainer>
    )
}


const HeroContainer = styled.section`
    background: linear-gradient( rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.3) ), url(${({background}) => background});
    background-size: cover;
    height: 100vh;
    background-position:center;
  
`


export default Hero

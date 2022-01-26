import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    a, button, input {
        font-family: 'Signika';
        transition: 0.5s ease;
    }

    button:hover, input[type='submit']:hover {
        filter: brightness(120%);
    }

    body {
        font-family: 'Signika';
        height: 100vh;
        overflow-x: hidden;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button {  
        opacity: .7;
        height: 25px;
    }

    .slick-dots li.slick-active button:before {
         color: red;
         opacity: 1;
    }

    .slick-dots li button:before {
        color: white;
    }


`


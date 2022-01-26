import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <div>
                    <h4>COMPANY</h4>
                    <h5>Careers</h5>
                    <h5>Delivery</h5>
                    <h5>Locate Store</h5>
                    <h5>News</h5>
                </div>
                <div>
                    <h4>HELP</h4>
                    <h5>Returns</h5>
                    <h5>Shipping info</h5>
                    <h5>FAQs</h5>
                    <h5>Size guide</h5>
                    <h5>Contact us</h5>
                </div>
                <div>
                    <h4>LEGAL</h4>
                    <h5>Privacy Policy</h5>
                    <h5>Terms & Conditions</h5>
                    <h5>Cookies & Security</h5>
                </div>
                <div>
                    <h4>ADDRESS</h4>
                    <h5>15 Vale Street</h5>
                    <h5>Tiverton, Rhode Island(RI)</h5>
                    <h5>(401) 816-0438</h5>
                    <h5>info@avalan.com</h5>
                </div>
                <div>
                    <h4>FOLLOW US</h4>
                    <h5>Facebook</h5>
                    <h5>Twitter</h5>
                    <h5>Instagram</h5>
                </div>
            </Container>
        </FooterContainer>
    )
}


const FooterContainer = styled.footer`
    width: 100%;
    min-height: 350px;
    background-color: ${({theme}) => theme.footer};
`


const Container = styled.div`
    height: 100%;
    width: 60%;
    margin: 0 auto;
    display: flex;
    padding: 5rem 0 3rem;
    justify-content: space-between;
    flex-wrap: wrap;


    div {
        h4 {
            user-select: none;
            margin-bottom: 15px;
            color: ${({theme}) => theme.footerTitle};
        }

        h5 {
            cursor: pointer;
            user-select: none;
            margin-block: 10px;
            font-size: 12px;
            font-weight: 500;
            color: white;
        }
    }


    @media(max-width: 700px) {
        flex-direction: column;

    }

    @media(max-width: 1000px) {
        gap: 20px;
    }
`

export default Footer;

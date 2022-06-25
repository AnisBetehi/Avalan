import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Checkout = () => {
  

  const navigate = useNavigate();

  const {user} = useSelector(state => state)
  useEffect(() => {
    !user.name && navigate('/login', { state: 'from checkout' });
  }, [user]);
  
  return (
        <CheckoutContainer>
            <h1>Payment Details</h1>
            <form action="">
                <Section>
                    <h3>Credit Card Information</h3>

                    <label htmlFor="name-on-card" >Name on card</label>
                    <input id='name-on-card' type="text" />

                    <label htmlFor="credit-card-number" >Credit Card Number</label>
                    <input id='credit-card-number' type="text" />

                  <div className="inner-container">

                    <div>
                        <label htmlFor="security-code" >Security code</label>
                        <input id='security-code' type="text" name="" />
                    </div>

                    <div className='inner-grid'>                
                        <label htmlFor="month">Expiration Date</label>
                        <input id='month' type="text" placeholder='Month'/>
                        <input type="text" placeholder='Year' />
                    </div>
                  </div>
                </Section>

                <Section>
                    <h3>Billing Information</h3>

                    <label htmlFor="first-name">First name</label>
                    <input id='first-name' type="text" />

                    <label htmlFor="last-name">Last name</label>
                    <input id='last-name' type="text" />

                    <label htmlFor="address">Billing address</label>
                    <input id='address' type="text" />

                    <div className="inner-container">
                        <div>
                            <label htmlFor="zip">Zip</label>
                            <input id='zip' type="text" />
                        </div>

                        <div>
                            <label htmlFor="country">Country</label>
                            <input id='country' type="text" />
                        </div>

                    </div>

                </Section>
                <input className='submit-button' type="submit" value='SUBMIT PAYMENT' />
            </form>
        </CheckoutContainer>
  )
};


export default Checkout;

const CheckoutContainer = styled.section`
    width: 60%;
    margin: 3em auto;
    padding: 2em 4em;
    box-shadow: rgba(99, 99, 99, 0.15) 0px .15em .55em 0px;
    font-size: 1rem;
    
    h1 {
      border-bottom: .1em solid rgba(0, 0, 0, .2);
      padding-bottom: 1.1em;
      font-weight: 100;
    }

    form {
      .submit-button {
        border: none;
        outline: none;
        padding: 1em;
        color: white;
        background-color: ${({theme}) => theme.main};
        cursor: pointer;
        font-size: .85em;
      }
    }

    @media(max-width: 800px) {
      width: 100%;
      margin-inline: 0;
      padding-inline: 20px;

      section {
        width: 100%;
      }
    }


    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.8rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.5rem;
    }

    @media(min-width: 4000px) {
        font-size: 2.8rem;
    }

    @media(min-width: 5000px) {
        font-size: 3.6rem;
    }

`

const Section = styled.section`

  display: flex;
  flex-direction: column;
  width: 50%;
  margin-block: 2.5em;

  > h3 {
    color: ${({theme}) => theme.main};
  }

  input {
    padding: .55em .5em;
    outline: none;
    margin-bottom: 1.1em;
    margin-top: .6em;
    border-radius: .2em;
    border: 1px solid rgba(0, 0, 0, .2);
    outline: none;
    font-size: .9em;
  }

  > label:first-of-type {
    margin-top: 2.5em;
  }

  label {
    font-weight: 100;
    font-size: .9em;
    color: ${({theme}) => theme.accent};
  }


  .inner-container {
    display: flex;
    gap: .6em;

    .inner-grid {
      display: grid;
      grid-template-column: 1fr 1fr;
      column-gap: .6em;

      > label {
        grid-column: 1 / 3;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      width: 50%;
      input {
        width: 100%;
      }
    }
  }

`


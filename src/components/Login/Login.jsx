import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config';
import {setDoc, doc} from 'firebase/firestore'
import { useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {cart} = useSelector(state => state);
    const {user} = useSelector(state => state);
    const [errorMessage, setErrorMessage] = useState();
    const [login, setLogin] = useState(true);

    const clearFields = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setConfirmPassword(''); 
        setErrorMessage(''); 
    }

    useEffect(() => {
        if(state === 'from checkout') setErrorMessage('Log in to complete your order');
        if(user.name && state === 'from checkout') {    
            clearFields();         
            navigate('/checkout');
        } else if(user.name) {
            clearFields();         
            navigate('/');
        }
    }, [user])

  
    const Register = async (e) => {
        if (login) {
            try {
                e.preventDefault();
                await signInWithEmailAndPassword(auth, userEmail, userPassword);                   
            } catch(error) {
                switch(error.message) {
                    case 'Firebase: Error (auth/wrong-password).':
                        setErrorMessage('Incorrect Password !')
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        setErrorMessage('User not found !');
                        break
                    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                        setErrorMessage('Password should be at least 6 characters !');
                        break
                    default:
                        setErrorMessage('Error occured, please try again ')
                 }  
              
            }
        } else {
            try {
                e.preventDefault();
                if (confirmPassword !== userPassword) {return setErrorMessage('Passwords dont match');}
                const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
                await setDoc(doc(db, 'usersData', user.user.uid), {
                    name: userName,
                    email: user.user.email,
                    cart: {items: cart.items, wishList: cart.wishList}
                  });
                clearFields();         
            } catch(error) {
                switch(error.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        setErrorMessage('Email already in use !')
                        break;
                    case 'Firebase: Error (auth/invalid-email).':
                        setErrorMessage('Invalid Email Address !');
                        break
                    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                        setErrorMessage('Password should be at least 6 characters !');
                        break
                    default:
                        setErrorMessage('Error occured, please try again ')
                 }  
            } 
        }
    }

    return (
        <>
        {!user.email && 
        <Container>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Title>{login ? 'Login' : 'Sign Up'}</Title>
            <Form onSubmit={Register}>
                {!login && <NameField type="text" placeholder='Username'value={userName} onChange={(e) => setUserName(e.target.value)}/>}
                <EmailField type="text" placeholder='Email'value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                <PasswordField type="password" placeholder='Password'value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                {!login && <PasswordField type="password" placeholder='Confirm Password'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>}
                <SubmitButton type='submit'>{login ? 'Login' : 'Sign Up'}</SubmitButton>
            </Form>
            <ToggleLogin onClick={() => {
                clearFields();
                setLogin(!login);
            }}>{login ? 'New here ? Sign up': ' Already have an account ? Login'}</ToggleLogin>
        </Container>}
        </>
    )
}


const Container = styled.div`
    position: relative;
    height: 25em;
    width: 25em;
    box-shadow: 0px 0px .95em rgba(0, 0, 0, .4);
    margin: 7em auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    @media(max-width: 700px) {
        width: 90%;
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


const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-items: center;
    height: 60%;
    width: 100%;
`
   

const Title = styled.h1`
    font-size: 1.1em;
    margin-bottom: 2.5em;
`

const ErrorMessage = styled.h5`
    width: 100%;
    text-align: center;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    font-weight: 600;
`


const EmailField = styled.input`
    border: none;
    width: 60%;
    border-bottom: 1px solid black;
    padding: 7px 0;
    font-weight: 550;
    font-size: .8em;
    outline: none;
`

const NameField = styled(EmailField)``
const PasswordField = styled(EmailField)` 
`
const SubmitButton = styled.button`
    border: none;
    padding: .6em .95em;
    background-color: ${({theme}) => theme.main};
    color: white;
    cursor: pointer;
    margin-top: .6em;
    font-size: .85em;
`

const ToggleLogin = styled.h5`
    color: crimson;
    font-size: .9em;
    cursor: pointer;
    user-select: none;
`

export default Login

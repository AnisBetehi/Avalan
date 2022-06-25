import React, {useState} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi'
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, resetWishList } from '../../features/cart';
import { logOutUser } from '../../features/user';


const Header = () => {

    const navigate = useNavigate();;

    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    const {cart} = useSelector(state => state);


    

    const [cartPreviewVisiblity, setCartPreviewVisibility] = useState(false);
    const [profilePreviewVisiblity, setProfilePreviewVisibility] = useState(false);
    const [menuVisiblity, setMenuVisibility] = useState(false);
    // const [scrolled, setScrolled] = useState();

    const toggleMenuVisiblity = () => {
        setMenuVisibility(!menuVisiblity);
    }

    const hideMenu = () => {
        setMenuVisibility(false);
    }


    const toggleVisiblity = (type) => {
        type === 'cart' ? setCartPreviewVisibility(!cartPreviewVisiblity) : setProfilePreviewVisibility(!profilePreviewVisiblity);
    }

    const cartPreviewRef = useDetectClickOutside({ onTriggered: () => { setCartPreviewVisibility(false)} });
    const profilePreviewRef  = useDetectClickOutside({ onTriggered: () => { setProfilePreviewVisibility(false)} });

    const signOut = () => {
        setProfilePreviewVisibility(false);
        dispatch(resetCart());
        dispatch(resetWishList())
        dispatch(logOutUser());
        navigate('/');
    }

    // window.addEventListener('scroll', (e) => {
    //     window.scrollY > 100 ? setScrolled(true) : setScrolled(false);
    // })


    return (
        <>
            <UpperHeader>
                <Container>
                    <h5>@ALGERIA 2022</h5>
                    <div>
                        <Link to='/wishlist'>WISHLIST</Link>
                        {user.name ? <ProfileContainer ref={el => profilePreviewRef.current = el} >
                            <Initials onClick={() => toggleVisiblity('profile')}>{user.name.slice(0, 2)}</Initials>
                            <ProfilePreview visible={profilePreviewVisiblity}>
                                <h4>{user.name}</h4>
                                <h5 onClick={signOut}>Log out</h5>
                            </ProfilePreview>
                        </ProfileContainer> : <Link to='/login'><Login>LOGIN</Login></Link>}
                    </div>
                </Container>
            </UpperHeader>
            <StyledHeader>
                <Container>
                    <StyledLogo><Link to='/'>AVALAN</Link></StyledLogo>
                    <Navigation menuVisiblity={menuVisiblity}>
                        <TiDelete onClick={toggleMenuVisiblity}className='close-menu'/>
                        <Link onClick={hideMenu} to='/products/men'>MEN</Link>
                        <Link onClick={hideMenu} to='/products/women'>WOMEN</Link>
                        <Link onClick={hideMenu} to='/products/jewelry'>JEWELRY</Link>
                        <Link onClick={hideMenu} to='/products/tech'>TECH</Link>
                    </Navigation>
                    <CartProfileContainer>
                        <div ref={el => cartPreviewRef.current = el} className='shopping-cart-container'>
                            <FaShoppingCart onClick={() => toggleVisiblity('cart')} className='shopping-cart-icon' />
                            <h5>{cart.items.length}</h5>
                            <CartPreview visible={cartPreviewVisiblity}>                         
                                {cart.items.length > 0 ? 
                                <ul>
                                    {cart.items.slice(0, 5).map((item, index) => {
                                    return (
                                        <div key={index}>                          
                                            <li>
                                                {item.name} x{item.quantity} <span>${Math.floor(item.price * item.quantity)}</span>
                                                <Tick checkout={item.checkout}>{item.checkout ? '(Included)' : '(Not Included)'}</Tick>
                                            </li>
                                            
                                        </div>                          
                                    )
                                })} 
                                {cart.items.length > 5 && <h4>{cart.items.length - 5} more...</h4>}
                                </ul> : <h1>Empty</h1>}

                                <div>
                                    <h1 className='total'>SubTotal:  <span>${cart.items.filter(item => item.checkout).reduce((total, item) => {
                                        total += parseInt(item.price * item.quantity);
                                        return total
                                    }, 0)}</span></h1>

                                    <Link onClick={()=> setCartPreviewVisibility(false)} to='/cart'><button>Go to cart</button></Link>
                                </div>
                            </CartPreview>
                        </div>
                        <GiHamburgerMenu onClick={toggleMenuVisiblity} className='menu-button'/>  
                    </CartProfileContainer>    
                </Container>          
            </StyledHeader>
            <LowerHeader>
                <Container>
                        <h3>FREE NEXT DAY DELIVERY</h3>
                        <h3>SALE NOW UP TO 50%</h3>
                        <h3>FREE RETURNS TO STORE</h3>
                </Container>
            </LowerHeader>
        </>
    )
}

const UpperHeader = styled.header`
    width: 100%;
    height: 3.1em;
    background-color: ${({theme}) => theme.upperHeader};
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: .1em solid rgba(255, 255, 255, .1);
    font-size: 1em;


    h5, a {
        color: ${({theme}) => theme.accent};
        text-decoration: none;
        font-size: .9em;
    }

    > div > div {
        display: flex;
        justify-content: space-betwwen;
        align-items: center;
        gap: 2.3em;
    }

    @media(max-width: 700px) {
        > div {
            width: 100%;
            padding-inline: 20px;

            div {
                gap: 20px;
            }
          
        }
    }

    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.9rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.7rem;
    }

    @media(min-width: 4000px) {
        font-size: 3rem;
    }

    @media(min-width: 5000px) {
        font-size: 4rem;
    }
`

const LowerHeader = styled.header`
    width: 100%;
    background: ${({theme}) => theme.lowerHeader};
    display: flex;
    align-items: center;

    > div {
        justify-content: center;

        h3 {
            width: 33%;
            padding-block: 1.3em;
            text-align: center;
            font-size: clamp(.6em, .75em, .95em);
            font-weight: 550;
        }

        h3:nth-child(2) {
            background-color: ${({theme}) => theme.main};
            color: white;
        }
    }



    @media(max-width: 700px) {
        
        > div {
            width: 100%;
            flex-direction: column;

            h3 {
                width: 100%;
            }
        }
        
     
    }
`

const Container = styled.div`
    height: 100%;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.9rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.7rem;
    }

    @media(min-width: 4000px) {
        font-size: 2.9rem;
    }

    @media(min-width: 5000px) {
        font-size: 3.7rem;
    }
`

const StyledHeader = styled.header`
    height: 6.5em;
    width: 100%;
    position: relative;
    background-color: ${({theme}) => theme.mainBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.5s ease;

    .menu-button {
        position: relative;
        color: ${({theme}) => theme.accent};
        cursor: pointer;

        @media(min-width: 40em) {
            display: none;
        }
    }

    .shopping-cart-container {
        position: relative;
        display: flex;
        justify-content: flex-end;
        margin-right: 1.6em;

        .shopping-cart-icon {
            font-size: 1.6em;
            cursor: pointer;
            transition: .2s ease;
            color: ${({theme}) => theme.accent };

            &:hover { 
                filter: brightness(80%);
            }  
        }

        h5 {
            position: absolute;
            top: -.7em;
            right: -.8em;
            color: white;
            padding: .6em .8em;
            font-size: .55em;
            background-color: ${({theme}) => theme.main};
            border-radius: 50%;
            pointer-events: none;
        }
    }

    @media (max-width: 700px) {

        > div {
            width: 100%;
            justify-content: space-between;
            padding-inline: 30px;
        }

        .shopping-cart-container .shopping-cart-icon {
            font-size: 25px;
        }

        h5 {
            font-size: 10px;
        }
    }

    @media(min-width: 1700px) {
        font-size: 1.3rem;
    }

    @media(min-width: 2000px) {
        font-size: 1.9rem;
    }

    @media(min-width: 2800px) {
        font-size: 2.7rem;
    }

    @media(min-width: 4000px) {
        font-size: 3rem;
    }

    @media(min-width: 5000px) {
        font-size: 4rem;
    }
   
`

const StyledLogo = styled.h1`
    font-size: 1.5em;
    a {
        text-decoration: none;
        color: ${({theme}) => theme.main};
    }

    @media (max-width: 700px) {
        font-size: 20px;


    }
`

const Navigation = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: .5s ease;

    a {
        font-size: .95em;
        font-weight: 500;
        text-decoration: none;
        color: ${({theme}) => theme.accent};
        margin: 0 .4em;
        transition: .5s ease;
    }

    a:hover {
        transform: scale(1.050);
    }

    .close-menu {
            color: white;
            position: absolute;
            top: 1.1em;
            right: .6em;
            font-size: 2em;
            cursor: pointer;
    }

    @media(max-width: 1000px) {
        width: 45%;

        a {
            font-size: 12px;
        }
    }

    @media(max-width: 40em) {
        position: fixed;
        top: 50px;
        bottom: 0;
        right: ${({menuVisiblity}) => menuVisiblity ? '0' : '-50%'};
        flex-direction: column;
        justify-content: flex-start;
        padding: 5rem 2rem;
        width: 50%;
        height: 100vh;
        z-index: 500;
        background-color: ${({theme}) => theme.navigationGlassy};
        backdrop-filter: blur(10px);

        a {
            color: white;
            text-shadow: 0 0 1px black;
            margin: 25px 0;
            font-size: .95rem;
            font-weight: 500;
        }
    }

    @media(min-width: 40em) {
        .close-menu {
            display: none;
        }
    }
`

const CartProfileContainer = styled.div`
    height: 100%;
    width: 95px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1.1em;
    padding-block: 1.8em;

    @media(max-width: 700px) {
        justify-content: space-around;
        margin-right: 10px;
    }
`

const CartPreview = styled.div`
    position: absolute;
    top: 1.2em;
    left: -15em;
    width: 16em;
    min-height: 12em;
    opacity: ${({visible}) => visible ? '1' : '0'};
    pointer-events: ${({visible}) => visible ? 'all' : 'none'};
    display: flex;
    overflow: hidden;
    padding: 1em;
    flex-direction: column;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0px 0px 1.4em rgba(0, 0, 0, .2);
    z-index: 500;
    transition: .5s ease;

    > h1 {
        font-size: 1em;
        text-align: center;
        color: ${({theme}) => theme.accent};
    }

    ul {
        padding-top: 1.1em;

        div {
            padding-left: .95em;
            margin: .4em 0;

            li {
                color: ${({theme}) => theme.upperHeader};
                font-weight: 600;
                font-size: .8em;
                line-height: 1.1em;
                padding-block: .6em;
            

                  
                span:first-child {
                    font-size: .85em;
                    color: ${({theme}) => theme.main};
                    text-decoration: underline;
                    font-weight: 900;
                    margin-left: .4em;
                    text-shadow: none;
                }
               
            }
            
            
        }

        h4 {
            font-size: .9em;
            margin-left: .6em;
            margin-top: 1.1em;

        }

        div:not(:last-child) {
                border-bottom: .1em solid white;
        }

    
        
    }

    .total {
        font-size: .85em;
        color: ${({theme}) => theme.upperHeader};

        span {
            color: ${({theme}) => theme.main};
        }
    }

    > div:last-child {
        margin-top: 1.8em;

        button {
            border: none;
            padding: .6em 1.4em;
            background-color: ${({theme}) => theme.main};
            color: white;
            font-size: .8em;
            cursor: pointer;
            margin-top: .6em;
        }
    }

    @media(max-width: 700px) {

        width: 200px;
        left: -180px;

        & > h1 {
            font-size: 14px;        
        }

        .total {
            font-size: 12px;
      
        }

        ul {
            div {           
                li {
                    font-size: 12px;                   
                    span:first-child {
                        font-size: 13px;                   
                    }              
                }
            }
        }

        > div:last-child {
            button {
                padding: 10px 15px;
                font-size: 12px;
                font-weight: 600;
            }
        }
    }
`

const Tick = styled.span`
    margin-left: .6em;
    font-size: .8em;
    color: ${({theme}) => theme.main};
    text-shadow: none;
                
`

const ProfileContainer = styled.div`
   position: relative;
   height: 2em;
   width: 2em;
   border-radius: 50%;
   background-color: white;
   display: grid;
   place-items: center;

`

const Initials = styled.h1`
    font-size: .95em;
    padding: .4em;
    cursor: pointer;

    &:first-letter {
       text-transform: capitalize;
   }
`

const ProfilePreview = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 75%;
    left: -11.5em;
    height: ${({visible}) => visible ? '7em': '0'};
    padding: ${({visible}) => visible ? '10px 0': '0'};
    width: 12.5em;
    background-color: white;
    box-shadow: 0 0 1.1em rgba(0, 0, 0, .1);
    border-radius: .2em;
    transition: .3s ease;
    overflow: hidden;

    h4 {
        color: ${({theme}) => theme.main};
        padding: .6em 1em;
        font-size: 1em;
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    h5 {
        display: inline;
        font-size: .8em;
        color: black;
        cursor: pointer;
        padding-left: 1.1em;
    }

    @media(max-width: 700px) {
        padding-block:  ${({visible}) => visible ? '20px 30px': '0'};
    }

   
`

const Login = styled.button`
    background-color: ${({theme}) => theme.main};
    outline: none;
    padding: .55em 1em;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: .2em;
    font-size: .95em;

    @media(max-width: 700px) {
        
    }
`

export default Header

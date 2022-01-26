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
    height: 50px;
    background-color: ${({theme}) => theme.upperHeader};
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, .1);


    h5, a {
        color: ${({theme}) => theme.accent};
        text-decoration: none;
        font-size: 14px;
    }

    > div > div {
        display: flex;
        justify-content: space-betwwen;
        align-items: center;
        gap: 40px;
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
            padding-block: 20px;
            text-align: center;
            font-size: clamp(12px, 13px, 15px);
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
`

const StyledHeader = styled.header`
    height: 100px;
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
        margin-right: 25px;

        .shopping-cart-icon {
            font-size: 25px;
            cursor: pointer;
            transition: .2s ease;
            color: ${({theme}) => theme.accent };

            &:hover { 
                filter: brightness(80%);
            }  
        }

        h5 {
            position: absolute;
            top: -7px;
            right: -10px;
            color: white;
            padding: 5px 7px;
            font-size: 9px;
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
   
`

const StyledLogo = styled.h1`
    font-size: 25px;
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
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        color: ${({theme}) => theme.accent};
        margin: 0 5px;
        transition: .5s ease;
    }

    a:hover {
        transform: scale(1.050);
    }

    .close-menu {
            color: white;
            position: absolute;
            top: 20px;
            right: 10px;
            font-size: 2rem;
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
    margin-right: 20px;
    padding-block: 30px;

    @media(max-width: 700px) {
        justify-content: space-around;
        margin-right: 10px;
    }
`

const CartPreview = styled.div`
    position: absolute;
    top: 20px;
    left: -230px;
    width: 250px;
    min-height: 200px;
    opacity: ${({visible}) => visible ? '1' : '0'};
    pointer-events: ${({visible}) => visible ? 'all' : 'none'};
    display: flex;
    overflow: hidden;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-around;
    background-color: white;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, .2);
    z-index: 500;
    transition: .5s ease;

    > h1 {
        font-size: 16px;
        text-align: center;
        color: ${({theme}) => theme.accent};
    }

    ul {
        padding-top: 20px;

        div {
            padding-left: 15px;
            margin: 5px 0;

            li {
                color: ${({theme}) => theme.upperHeader};
                font-weight: 600;
                font-size: 13px;
                line-height: 20px;
                padding-block: 10px;
            

                  
                span:first-child {
                    font-size: 13px;
                    color: ${({theme}) => theme.main};
                    text-decoration: underline;
                    font-weight: 900;
                    margin-left: 5px;
                    text-shadow: none;
                }
               
            }
            
            
        }

        h4 {
            font-size: 14px;
            margin-left: 10px;
            margin-top: 20px;

        }

        div:not(:last-child) {
                border-bottom: 1px solid white;
        }

    
        
    }

    .total {
        font-size: 13px;
        color: ${({theme}) => theme.upperHeader};

        span {
            color: ${({theme}) => theme.main};
        }
    }

    > div:last-child {
        margin-top: 30px;

        button {
            border: none;
            padding: 10px 20px;
            background-color: ${({theme}) => theme.main};
            color: white;
            font-size: 12px;
            cursor: pointer;
            margin: 10px 0;
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
    margin-left: 10px;
    font-size: 12px;
    color: ${({theme}) => theme.main};
    text-shadow: none;
                
`

const ProfileContainer = styled.div`
   position: relative;
   height: 35px;
   width: 35px;
   border-radius: 50%;
   background-color: white;
   display: grid;
   place-items: center;

`

const Initials = styled.h1`
    font-size: 15px;
    padding: 5px;
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
    left: -180px;
    height: ${({visible}) => visible ? '120px': '0'};
    padding: ${({visible}) => visible ? '10px 0': '0'};
    width: 200px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    border-radius: 3px;
    transition: .3s ease;
    overflow: hidden;

    h4 {
        color: ${({theme}) => theme.main};
        padding: 10px 15px;
        font-size: 16px;
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    h5 {
        display: inline;
        font-size: 12px;
        color: black;
        cursor: pointer;
        padding-left: 20px;
    }

    @media(max-width: 700px) {
        padding-block:  ${({visible}) => visible ? '20px 30px': '0'};
    }

   
`

const Login = styled.button`
    background-color: ${({theme}) => theme.main};
    outline: none;
    padding: 8px 16px;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 3px;

    @media(max-width: 700px) {
        
    }
`

export default Header

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyles } from './Styles/GlobalStyles';
import ThemeProv from './Styles/ThemeProv.jsx'
import Header from './components/Header/Header';
import Main from './components/main/main';
import Products from './components/Products/Products.jsx';
import ProductsPreview from './components/Products/ProductsPreview';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/footer';
import WishList from './components/Cart/wishList';
import Checkout from './components/Cart/Checkout';
import NewLetter from './components/NewsLetter/NewLetter';
import ItemDetail from './components/itemDetail/itemDetail';
import ScrollToTop from './components/scrollToTop';


function App() {
  return (
    <>
      <GlobalStyles />   
        <ThemeProv>     
          <Router> 
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path='/' element={
              <>
                <Hero />
                <Main />
                <ProductsPreview />
                <NewLetter />      
              </>
            }/>
              <Route path='/products' element={<Products />} /> 
              <Route path="*" element={<Navigate to="/" />} />              
              <Route path='/cart' element={<Cart />} />                                           
              <Route path='/login'  element={<Login />} />
              <Route path='/wishlist' element={<WishList />} />
              <Route path='/products/:category/:id' element={<ItemDetail />} />
              <Route path='/products/tech' element={<Products category='tech' />} />
              <Route path='/products/men' element={<Products category='men clothing' />} />
              <Route path='/products/women' element={<Products category='women clothing' />} />
              <Route path='/products/jewelry' element={<Products category='jewelry' />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>  
            <Footer />
          </Router>
        </ThemeProv>
    </>
  );
}

export default App;

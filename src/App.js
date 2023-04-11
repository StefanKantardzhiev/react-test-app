import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { authServiceFactory } from './services/authService';
import { useParams } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { offerServiceFactory } from './services/offerService';
import { Offer } from './components/Offer/Offer';
import { Latest } from './components/Latest/Latest';
import { OfferDetails } from './components/OfferDetails/OfferDetails'
import { Create } from './components/Create/Create';
import { EditOffer } from './components/EditOffer/EditOffer';
import { Profile } from './components/Profile/Profile';


function App() {

  //Offers get from server  


  //user get from server  
  const [user, setUser] = useLocalStorage('auth', {});
  const [auth, setAuth] = useLocalStorage('auth', {});


  // offers GET services


  const authService = authServiceFactory(auth.accessToken)


  const setUserData = (userData) => {
    setUser({ ...userData });
  }

  const onLogoutHandler = () => {
    setUser(null);
    localStorage.clear();
    authService.logout();
  }


  return (

    <AuthContext.Provider value={{ user, setUserData, onLogoutHandler }}>

      <Header />

      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/offers' element={<Offer />} />
          <Route path='/offers/latest' element={<Latest />} />
          <Route path='/offers/create' element={<Create user={user} />} />
          <Route path='/offers/:offerId' element={<OfferDetails />} />
          <Route path='/offers/:offerId/edit' element={<EditOffer />} />
          <Route path='/profile' element={<Profile user={user} />} />
        </Routes>
      </main>

    </AuthContext.Provider>
  );
}

export default App;

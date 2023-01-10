import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import  { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageClients from './components/Pages/PageClients/PageClients';
import PageCryptomonnaie from './components/Pages/PageCryptocurrency/PageCryptocurrency';
import PageError from './components/Pages/PageError/PageError'
import Login from './components/Login/Login';
import DummyReducer from './DummyReducer';
const store = configureStore({
  reducer: {
    dummy:DummyReducer,
  }
 })


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {localStorage.getItem("jwt") &&
          <>
          <Route path="/users" element={<PageClients />} />
          <Route path="/cryptomonnaie" element={<PageCryptomonnaie />} />
          </>
          }
          <Route path="*" element={<PageError />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


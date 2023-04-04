import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AdminProvider } from './contexts/adminContext/AdminContext';
import { CookiesProvider } from 'react-cookie';
import AppContextContainer from './contexts/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <ToastContainer />

    <AdminProvider>
      <Router>
        <AppContextContainer>
          <App />
        </AppContextContainer>
      </Router>

    </AdminProvider>
  </CookiesProvider>

);


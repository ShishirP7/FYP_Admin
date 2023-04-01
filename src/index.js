import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AdminProvider } from './contexts/adminContext/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminProvider>
    <Router>
      <App />
    </Router>
  </AdminProvider>

);


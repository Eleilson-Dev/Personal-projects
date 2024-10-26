import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './providers/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ListsProvider } from './providers/ListsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="495447314299-g8i4rg2dl0hgv3ttu0k0j6b0brgqc3um.apps.googleusercontent.com">
        <UserProvider>
          <ListsProvider>
            <App />
          </ListsProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);

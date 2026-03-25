import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContextProvider from './context/ThemeContext';
import { GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      'html, body, #root': {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'fixed',
        overscrollBehavior: 'none',
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      {globalStyles}
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
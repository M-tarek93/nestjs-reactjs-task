import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import appQueryClient, { localStoragePersister } from './config/appQueryClient';
import constants from './config/constants';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  palette: {
    primary: {
      main: constants.PRIMARY_COLOR,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={appQueryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistQueryClientProvider>
  </React.StrictMode>
);


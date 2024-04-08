import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';

import { persistor, store } from 'store';
import { ModalProvider } from 'hooks/useTxModal';

import Routes from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={"/"}>
            <SnackbarProvider maxSnack={5}>
              <QueryClientProvider client={queryClient}>{<Routes />}</QueryClientProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </PersistGate>
      </ModalProvider>
    </Provider>
  );
}

export default App;

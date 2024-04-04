import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { store } from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/"}>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

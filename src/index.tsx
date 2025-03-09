import { store } from './store';
import { Provider } from 'react-redux';
import { fetchCamerasAction } from './store/api-actions/api-actions';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

store.dispatch(fetchCamerasAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import { store } from './store';
import { Provider } from 'react-redux';
import { fetchCamerasAction, fetchPromoCamerasAction } from './store/api-actions/api-actions';
import { cameraData } from './store/camera-data/camera-data';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

store.dispatch(cameraData.actions.getCamerasInCartFromLocalStorage());
store.dispatch(fetchCamerasAction());
store.dispatch(fetchPromoCamerasAction());

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

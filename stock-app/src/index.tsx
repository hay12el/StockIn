import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import MainRouter from './router/mainRouter';
import { Provider } from 'react-redux'
import {store} from './redux/Store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <MainRouter/>
  </Provider>
);

reportWebVitals();

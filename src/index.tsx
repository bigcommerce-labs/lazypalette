import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import App from './components/App/App';
import './index.css';
import middleware from './middleware/middleware';
import reducers from './reducers/reducers';
import register from './registerServiceWorker';

const store = createStore(
  reducers,
  middleware
);

const baseHref: string = document.getElementsByTagName('base')[0]
  .getAttribute('href')!;

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename={baseHref}>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

register();

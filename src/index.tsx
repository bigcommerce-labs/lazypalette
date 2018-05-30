import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import App from './components/App/App';
import './index.css';
import middleware from './middleware/middleware';
import reducers from './reducers/reducers';
import register from './registerServiceWorker';

const store = createStore(reducers, middleware);

const root = document.getElementById('root');
const config = JSON.parse(root!.getAttribute('config')!);

const baseHref: string = document.getElementsByTagName('base')[0]
  .getAttribute('href')!;

render(
  <Provider store={store}>
    <BrowserRouter basename={baseHref}>
      <App config={config}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

register();

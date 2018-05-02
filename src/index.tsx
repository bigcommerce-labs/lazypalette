import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import register from './registerServiceWorker';
import App from './App';

const baseHref: string = document.getElementsByTagName('base')[0]
  .getAttribute('href')!;

ReactDOM.render((
  <BrowserRouter basename={baseHref}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

register();

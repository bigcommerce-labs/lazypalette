// Polyfills for ie10, see: https://reactjs.org/docs/javascript-environment-requirements.html
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import App, { AppConfig } from './components/App/App';
import './index.css';
import middleware from './middleware/middleware';
import reducers from './reducers/reducers';
import * as analytics from './services/analytics';
import browserDetection, { BrowserCheckResult, BrowserVersion } from './services/browserDetection/browserDetection';
import { UnsupportedBrowser } from './services/browserDetection/errors/unsupportedBrowser';
import { renderUnsupportedBrowserPage } from './services/unsupportedBrowserPage/unsupportedBrowserPage';

const root = document.getElementById('root');
const store = createStore(reducers, middleware);

// Seeded data is added server side in the BCApp. See: app/Http/ControlPanel/StoreDesignController.php
const seededConfig: AppConfig = JSON.parse(root!.getAttribute('config')!);
const baseHref: string = document.getElementsByTagName('base')[0].getAttribute('href')!;

analytics.init(store);

// Stencil detection
if (seededConfig.seedActiveTheme && seededConfig.seedActiveTheme.themeId) {
    const unsupportedBrowsers = [BrowserVersion.InternetExplorer10];
    browserDetection({ unsupportedBrowsers })
        .then((results: BrowserCheckResult[]) => {
            // Render store design react application
            render(
                <Provider store={store}>
                    <BrowserRouter basename={baseHref}>
                        <App config={seededConfig}/>
                    </BrowserRouter>
                </Provider>,
                root
            );
        })
        .catch((error: UnsupportedBrowser) => {
            // Render a page to inform user we do not support their browser
            renderUnsupportedBrowserPage(seededConfig);
        });
} else {
    throw new Error('Blueprint is not supported.');
}

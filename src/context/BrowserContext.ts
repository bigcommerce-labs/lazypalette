import React from 'react';

export interface Browser {
    _window: any;
}

const defaultValue: Browser = {
    _window: window,
};

const BrowserContext = React.createContext(defaultValue);

export default BrowserContext;

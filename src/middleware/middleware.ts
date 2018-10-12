import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({ collapsed: true }));
}

middleware.push(thunk);

export default composeEnhancers(
    applyMiddleware(...middleware)
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Page';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './common/rootReducer';

const middleware: any[] = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
        // diff: true,
        colors: {
            title: () => '#f4ff14',
            prevState: () => '#4CAF50',
            action: () => '#03A9F4',
            nextState: () => '#4CAF50',
            error: () => '#F20404',
        },
    }))
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

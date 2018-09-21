/// <reference path="./types.d.ts" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import 'whatwg-fetch';

import Router from './Router';
import './index.scss';
import store from './store';

const app = document.querySelector('#app');

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    app,
);

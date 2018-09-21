import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Home from './Page/Home';
import NotFound from './Page/NotFound';
import Header from './Component/Shared/Header/index';

export default () => (
    <div>
        <Header />
        <Router>
            <Home path="/" />
            <NotFound default />
        </Router>
    </div>
);

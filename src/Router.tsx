import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Home from './Page/Home';
import NotFound from './Page/NotFound';
import FAQ from './Page/FAQ';
import Header from './Component/Shared/Header';

export default () => (
    <div>
        <Header />
        <Router>
            <Home path="/" />
            <FAQ path="/faq" />
            <NotFound default />
        </Router>
    </div>
);

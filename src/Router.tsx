import * as React from 'react';
import { Router, RouteComponentProps, Match } from '@reach/router';
import ReduxToastr from 'react-redux-toastr';

import Home from './Page/Home';
import NotFound from './Page/NotFound';
import FAQ from './Page/FAQ';
import Profile from './Page/Profile';
import QR from './Page/QR';
import Header from 'Component/Shared/Header';

export default () => (
    <div>
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            // closeOnToastrClick
        />
        <Header />
        <Router>
            <Home path="/" />
            <FAQ path="/faq" />
            <QR path="/qr" />
            <Profile path="/profile/:username" />
            <NotFound default />
        </Router>
    </div>
);

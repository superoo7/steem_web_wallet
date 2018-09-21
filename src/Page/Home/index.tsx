import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import SignIn from 'Component/Shared/SignIn/SignIn';

class HomePage extends React.Component<RouteComponentProps> {
    render() {
        return (
            <React.Fragment>
                <SignIn />
            </React.Fragment>
        );
    }
}

export default HomePage;

import SignIn from 'Component/Shared/SignIn';
import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

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

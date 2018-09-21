import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import SignIn from '../../Component/Shared/SignIn';

class HomePage extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <SignIn />
            </div>
        );
    }
}

export default HomePage;

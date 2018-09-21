import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import * as localforage from 'localforage';

class HomePage extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default HomePage;

import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

const NotFoundPage: React.StatelessComponent<RouteComponentProps> = () => {
    return (
        <div>
            <h1>You have reach 404 page.</h1>
            <Link to="/">Go back to homepage</Link>
        </div>
    );
};

export default NotFoundPage;

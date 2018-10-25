import * as React from 'react';
import Settings from 'Component/Settings';
import { RouteComponentProps } from '@reach/router';

class SettingPage extends React.Component<RouteComponentProps> {
    render() {
        return <Settings />;
    }
}

export default SettingPage;

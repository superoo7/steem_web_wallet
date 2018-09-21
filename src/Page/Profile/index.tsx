import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import Wallet from 'Component/Shared/SignIn/Wallet';

interface IProfilePageProps extends RouteComponentProps {}

class ProfilePage extends React.Component<IProfilePageProps> {
    render() {
        const props: any = this.props;
        const username = props.username;
        return <Wallet username={username} />;
    }
}

export default ProfilePage;

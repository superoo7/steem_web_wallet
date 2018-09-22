import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import Wallet from 'Component/Shared/SignIn/Wallet';

interface IProfilePageProps extends RouteComponentProps {}

class ProfilePage extends React.Component<IProfilePageProps> {
    constructor(props: IProfilePageProps) {
        super(props);
    }

    render() {
        const props: any = this.props;
        const username: string = props.username;
        // ?currency=STEEM&amount=20&to=superoo7

        return (
            <div className="Wallet__Container--Main">
                <Wallet username={username} />
                <Link className="Button__Transaction" to={`/transaction?to=${username}`}>
                    Make Transaction to @{username}
                </Link>
            </div>
        );
    }
}

export default ProfilePage;

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
        const search: string = props.location.search;

        if (search) {
            const _currency: RegExpMatchArray | [string, string] = search.match(/currency=([^&]*)/) || ['', ''];
            const _amount: RegExpMatchArray | [string, string] = search.match(/amount=([^&]*)/) || ['', ''];
            const _to: RegExpMatchArray | [string, string] = search.match(/name=([^&]*)/) || ['', ''];
            const currency = _currency[1];
            const amount = _amount[1];
            const to = _to[1];
        }

        return <Wallet username={username} />;
    }
}

export default ProfilePage;

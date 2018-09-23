import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Transaction from '../../Component/Transaction';

interface ITransferPageState {
    currency: string;
    amount: string;
    to: string;
}

class TransferPage extends React.Component<RouteComponentProps, ITransferPageState> {
    constructor(props: RouteComponentProps) {
        super(props);
        const location: any = this.props.location;
        const search: string = location.search || '';
        let currency = '';
        let amount = '';
        let to = '';
        if (search) {
            const _currency: RegExpMatchArray | [string, string] = search.match(/currency=([^&]*)/) || ['', ''];
            const _amount: RegExpMatchArray | [string, string] = search.match(/amount=([^&]*)/) || ['', ''];
            const _to: RegExpMatchArray | [string, string] = search.match(/to=([^&]*)/) || ['', ''];
            currency = _currency[1];
            amount = _amount[1];
            to = _to[1];
            console.log(currency, amount, to);
        }
        this.state = {
            currency: currency,
            amount: amount,
            to: to,
        };
    }

    render() {
        const { currency, amount, to } = this.state;
        return <Transaction currency={currency} amount={amount} to={to} />;
    }
}

export default TransferPage;

/// <reference path="snarkdown.d.ts" />
import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import snarkdown from 'snarkdown';
import Loading from 'Component/Shared/SignIn/Loading/Loading';

interface IFAQState {
    isLoading: boolean;
    md: string;
}

class FAQPage extends React.Component<RouteComponentProps, IFAQState> {
    state = {
        isLoading: true,
        md: '',
    };

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/superoo7/steem_web_wallet/master/FAQ.md')
            .then(d => d.text())
            .then(d => this.setState({ md: d, isLoading: false }))
            .catch(_err => this.setState({ md: `# Error while loading for FAQ page`, isLoading: false }));
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div className="Markdown__Container">
                <div className="Markdown__Content" dangerouslySetInnerHTML={{ __html: snarkdown(this.state.md) }} />
            </div>
        );
    }
}

export default FAQPage;

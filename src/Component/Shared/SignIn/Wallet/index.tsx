import * as React from 'react';
import { RootAction, RootState } from 'Types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import Select from 'react-select';
const QRCode = require('qrcode.react');

import { getAuthorProfiles } from 'Component/Shared/SignIn/Wallet/SteemProfileAction';
import { getProfile } from './SteemProfileSelector';
import Loading from 'Component/Shared/SignIn/Loading/Loading';

interface IWalletProps {
    username: string;
    profile: {
        authors: string[];
        profiles: {
            [key: string]: {
                data: any;
                profile: string;
                cover: string;
                about: string;
                vp: string;
                balance: string;
                sbd_balance: string;
                website: string;
            };
        };
        isLoading: boolean;
    };
    getAuthorProfiles: (authors: string[]) => void;
}

interface IWalletState {
    selectedOption: {
        label: string;
        value: string;
    };
}

class Wallet extends React.Component<IWalletProps, IWalletState> {
    state = {
        selectedOption: {
            label: 'SWW',
            value: `${window.location.origin}/profile/${this.props.username}`,
        },
    };
    componentDidMount() {
        if (!this.props.profile.profiles[this.props.username]) {
            this.props.getAuthorProfiles([this.props.username]);
        }
    }

    handleChange = (selectedOption: any) => {
        this.setState({ selectedOption });
        console.log(selectedOption);
    };

    render() {
        const { profile, username } = this.props;
        const { isLoading, profiles } = profile;
        const prof = profiles[username];
        if (isLoading || !prof) {
            return <Loading />;
        }
        const location = `${window.location.origin}/profile/${username}`;
        const selectOpt = [
            { value: location, label: 'SWW' },
            { value: `https://steemit.com/@${username}/transfers`, label: 'Steemit' },
            { value: `https://busy.org/@${username}/transfers`, label: 'Busy' },
        ];
        const { selectedOption } = this.state;
        return (
            <div className="Wallet__Container--Out">
                <div
                    className="Wallet__Container--In"
                    style={{
                        backgroundImage: `url(${prof.cover})`,
                    }}
                >
                    <img src={prof.profile} alt={username} />
                    <h2>{username}</h2>
                </div>

                <div>
                    <div className="Card Card__Steem">
                        <span>STEEM: {parseFloat(prof.balance)} </span>
                    </div>
                    <div className="Card Card__SBD">
                        <span>SBD: {parseFloat(prof.sbd_balance)}</span>
                    </div>
                    <div className="Card Card__QR">
                        <Select options={selectOpt} onChange={this.handleChange} value={selectedOption} />
                        <QRCode className="QR" value={selectedOption.value} />
                        <input className="QR__Text" value={selectedOption.value} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    profile: getProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            getAuthorProfiles: getAuthorProfiles,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wallet);

import * as React from 'react';
import { RootAction, RootState } from 'Types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
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

interface IWalletState {}

class Wallet extends React.Component<IWalletProps, IWalletState> {
    componentDidMount() {
        if (!this.props.profile.profiles[this.props.username]) {
            this.props.getAuthorProfiles([this.props.username]);
        }
    }
    render() {
        const { profile, username } = this.props;
        const { isLoading, profiles } = profile;
        const prof = profiles[username];
        if (isLoading || !prof) {
            return <Loading />;
        }

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

                <div className="Card Card__Steem">
                    <span>STEEM: {parseFloat(prof.balance)} </span>
                </div>
                <div className="Card Card__SBD">
                    <span>SBD: {parseFloat(prof.sbd_balance)}</span>
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

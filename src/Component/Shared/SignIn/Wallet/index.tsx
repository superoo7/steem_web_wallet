import * as React from 'react';
import { RootAction, RootState } from 'Types';
import { connect } from 'react-redux';
import { getUsername } from '../SignInSelector';
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
            <div>
                <div
                    style={{
                        backgroundImage: `url(${prof.cover})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        backgroundColor: '#eee',
                        minHeight: '180px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'middle',
                    }}
                >
                    <h2 style={{ color: 'white' }}>
                        <img src={prof.profile} alt={username} />
                        {username}
                    </h2>
                </div>
                <p>Wallet of {this.props.username}</p>
                <span>STEEM: {prof.balance} </span>
                <br />
                <span>SBD: {prof.sbd_balance}</span>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    username: getUsername(state),
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

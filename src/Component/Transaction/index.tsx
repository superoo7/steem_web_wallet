import * as React from 'react';
import Tooltips from 'Component/Shared/Tooltips';
import { RootState, RootAction } from 'Types';
import { getIsSignIn, getUsername } from 'Component/Shared/SignIn/SignInSelector';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { toastr } from 'react-redux-toastr';
import { getProfile } from 'Component/Shared/SignIn/Wallet/SteemProfileSelector';
import { bindActionCreators, Dispatch } from 'redux';
import { getAuthorProfiles } from 'Component/Shared/SignIn/Wallet/SteemProfileAction';
import Loading from 'Component/Shared/SignIn/Loading/Loading';

interface ITransactionProps {
    currency: string;
    amount: string;
    to: string;

    isSignIn: boolean;
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

interface ITransactionState {
    errorMessage: {
        from: string;
        to: string;
    };
    from: string;
    to: string;
    amount: string;
    currency: string;
}

class Transaction extends React.Component<ITransactionProps, ITransactionState> {
    state = {
        errorMessage: {
            from: '',
            to: '',
        },
        from: '',
        to: this.props.to,
        amount: this.props.amount,
        currency: this.props.currency,
    };

    componentDidMount() {
        this.props.getAuthorProfiles([this.props.to]);
        setTimeout(() => {
            if (!this.props.isSignIn && !this.props.username) {
                toastr.error('Not Authenticated', 'You are not signed in!');
                // navigate('/');
            }
        }, 1000);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const s = {};
        const name = e.target.name;
        const value = e.target.value;
        s[name] = value;
        if (name === 'to') {
            if (!this.props.profile.profiles[value]) {
                this.props.getAuthorProfiles([value]);
            }
        }
        this.setState(s, () => this.validateField(name, value));
    };

    validateField = (name: string, value: string) => {};

    render() {
        const { to, amount, currency } = this.state;
        const { profile, username } = this.props;
        const { isLoading, profiles } = profile;
        // const prof = profiles[to];

        return (
            <div className="Login__Container--Outer">
                <div className="Login__Container">
                    <h1 className="Login__Title">Transfer</h1>
                    <form>
                        <div className="Form__Container">
                            {this.state.errorMessage.from ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.from}</b>
                            ) : (
                                undefined
                            )}
                            <label>
                                <b>
                                    <Tooltips hoverText={'From'} tooltipsText={'Your Steemit Username.'} />
                                </b>
                            </label>
                            <input value={this.props.username} disabled />
                            {this.state.errorMessage.from ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.to}</b>
                            ) : (
                                undefined
                            )}
                            <label style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <b>
                                    <Tooltips hoverText={'To'} tooltipsText={'To who'} />
                                </b>
                                <div
                                    style={{
                                        maxHeight: '3rem',
                                    }}
                                >
                                    {isLoading ? (
                                        <Loading />
                                    ) : profiles[to] ? (
                                        <img
                                            style={{
                                                width: '6rem',
                                                height: '6rem',
                                                minWidth: '6rem',
                                                minHeight: '6rem',
                                            }}
                                            src={profiles[to].profile || '/favicon.ico'}
                                            alt={to}
                                        />
                                    ) : (
                                        undefined
                                    )}
                                </div>
                            </label>
                            <input
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Enter To"
                                name="to"
                                value={to}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: any) => ({
    isSignIn: getIsSignIn(state),
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
)(Transaction);

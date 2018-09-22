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
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';

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
        amount: string;
    };
    from: string;
    to: string;
    amount: string;
    currency: string;
    selectCurrency: { label: string; value: string };
}

class Transaction extends React.Component<ITransactionProps, ITransactionState> {
    state = {
        errorMessage: {
            from: '',
            to: '',
            amount: '',
        },
        from: '',
        to: this.props.to,
        amount: this.props.amount || '0.000',
        currency: this.props.currency || 'STEEM',
        selectCurrency: {
            label: this.props.currency || 'STEEM',
            value: this.props.currency || 'STEEM',
        },
    };

    componentDidMount() {
        if (!this.props.profile.profiles[this.props.to]) {
            this.props.getAuthorProfiles([this.props.to]);
        } else if (!this.props.profile.profiles[this.props.username]) {
            this.props.getAuthorProfiles([this.props.username]);
        }
        setTimeout(() => {
            if (!this.props.isSignIn && !this.props.username) {
                toastr.error('Not Authenticated', 'You are not signed in!');
                // navigate('/');
            }
        }, 2000);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const s = {};
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'to') {
            if (!this.props.profile.profiles[value]) {
                this.props.getAuthorProfiles([value]);
            }
        }

        s[name] = value;
        this.setState(s, () => this.validateField(name, value));
    };

    handleSelectChange = (value: ValueType<{ value: string; label: string }>) => {
        const v: any = value;
        if (v.value === 'STEEM' || v.value === 'SBD') {
            this.setState({
                currency: v.value,
                selectCurrency: v,
            });
        } else {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    currency: 'Invalid currency',
                },
            });
        }
    };

    validateField = (name: string, value: string) => {
        let message = '';
        switch (name) {
            case 'to':
                const profiles = this.props.profile.profiles;
                const prof = profiles[value];
                if (!prof) {
                    message = 'Profile not found';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, to: message } });

                break;
            case 'amount':
                // Insufficient funds
                break;
        }
    };

    render() {
        const { to, amount, currency } = this.state;
        const { profile, username } = this.props;
        const { isLoading, profiles } = profile;
        // const prof = profiles[to];

        return (
            <div className="Login__Container--Outer">
                <div className="Login__Container">
                    <h1 className="Login__Title">Transfer</h1>
                    {!!profiles[username] ? (
                        <div>
                            <p>{`${parseFloat(profiles[username].balance) || '-'} STEEM`}</p>
                            <p>{`${parseFloat(profiles[username].sbd_balance)} SBD` || '-'}</p>{' '}
                        </div>
                    ) : (
                        undefined
                    )}
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
                            {this.state.errorMessage.amount ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.amount}</b>
                            ) : (
                                undefined
                            )}
                            <label>
                                <b>
                                    <Tooltips hoverText={'Amount'} tooltipsText={'Amount of Steem/SBD'} />
                                </b>
                            </label>
                            <input
                                onChange={this.handleChange}
                                type="number"
                                placeholder="Enter To"
                                name="amount"
                                value={amount}
                                required
                            />
                            <label>
                                <b>
                                    <Tooltips hoverText="Currency" tooltipsText="STEEM or SBD" />
                                </b>
                                <Select
                                    onChange={this.handleSelectChange}
                                    options={[{ value: 'STEEM', label: 'STEEM' }, { value: 'SBD', label: 'SBD' }]}
                                    value={this.state.selectCurrency}
                                />
                            </label>
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

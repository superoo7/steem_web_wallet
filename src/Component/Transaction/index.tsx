import * as React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { getItem } from 'localforage';

import { RootState, RootAction } from 'Types';
import { getIsSignIn, getUsername } from 'Component/Shared/SignIn/SignInSelector';
import Tooltips from 'Component/Shared/Tooltips';
import { getProfile } from 'Component/Shared/SignIn/Wallet/SteemProfileSelector';
import { bindActionCreators, Dispatch } from 'redux';
import { getAuthorProfiles } from 'Component/Shared/SignIn/Wallet/SteemProfileAction';
import Loading from 'Component/Shared/SignIn/Loading/Loading';
import { account } from 'Utils/Steem';
import { localForageKey } from 'Utils/LocalForage';
import { openInfo, openConfirm } from 'Component/Shared/Modal/ModalAction';
import Info from 'Component/Shared/Modal/Info/Info';
import Confirm from 'Component/Shared/Modal/Confirm/Confirm';

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
    openInfo: (message: string) => void;
    openConfirm: () => void;
}

interface ITransactionState {
    errorMessage: {
        from: string;
        to: string;
        memo: string;
        amount: string;
        currency: string;
    };
    from: string;
    to: string;
    memo: string;
    amount: string;
    currency: 'STEEM' | 'SBD';
    selectCurrency: { label: string; value: string };
}

class Transaction extends React.Component<ITransactionProps, ITransactionState> {
    constructor(props: ITransactionProps) {
        super(props);
        const amount: string = this.props.amount ? parseFloat(this.props.amount).toFixed(3) : '';
        const c = this.props.currency;
        const currency: 'STEEM' | 'SBD' = c === 'STEEM' || c === 'SBD' ? c : 'STEEM';
        this.state = {
            errorMessage: {
                from: '',
                to: '',
                memo: '',
                amount: '',
                currency: '',
            },
            from: '',
            to: this.props.to,
            memo: '',
            amount: amount,
            currency: currency,
            selectCurrency: {
                label: currency,
                value: currency,
            },
        };
    }

    componentDidMount() {
        const profile = this.props.profile;

        if (this.props.to !== '' && !profile.profiles[this.props.to]) {
            this.props.getAuthorProfiles([this.props.to]);
        }
        setTimeout(() => {
            if (!this.props.isSignIn && !this.props.username) {
                toastr.error('Not Authenticated', 'You are not signed in!');
                // navigate('/');
            } else {
                if (this.props.username !== '' && !this.props.profile.profiles[this.props.username]) {
                    this.props.getAuthorProfiles([this.props.username]);
                }
            }
        }, 2000);
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.validateField('to', this.state.to);
        this.validateField('amount', this.state.amount);
        this.validateField('currency', this.state.currency);
        this.validateField('memo', this.state.memo);

        if (
            this.state.errorMessage.from === '' &&
            this.state.errorMessage.to === '' &&
            this.state.errorMessage.amount === '' &&
            this.state.errorMessage.currency === '' &&
            this.state.errorMessage.memo === ''
        ) {
            this.props.openConfirm();
        } else {
            toastr.error('Error on logging in', 'Sign in form not completed yet.');
        }
    };

    updatePassword = async (password: string) => {
        const aesPW = password;
        const aesEnc: string = (await getItem(localForageKey.WALLET_AES_ACTIVE)) as string;
        try {
            const activeKey = account.decryptData(aesEnc, aesPW);
            account
                .sendTransactionRx({
                    activeKey: activeKey,
                    from: this.props.username,
                    to: this.state.to,
                    amount: this.state.amount,
                    currency: this.state.currency,
                    memo: this.state.memo,
                })
                .then(d => {
                    this.props.openInfo(`Successful Transaction!\n
                        id: ${d.id}\n
                        block number: ${d.block_num}\n
                        trx number: ${d.trx_num}
                        `);
                });
        } catch (err) {
            const error = String(err) === '[object Object]' ? JSON.stringify(err) : String(err);
            this.props.openInfo(error);
        }
    };

    getMessage = () => {
        const { to, amount, currency } = this.state;
        return `Confirm transfer ${amount} ${currency} to ${to}?`;
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const s = {};
        const name = e.target.name;
        let value = e.target.value;

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
            this.validateField('currency', v.value);
        }
    };

    validateField = (name: string, value: string) => {
        let message = '';
        switch (name) {
            case 'to':
                const profiles = this.props.profile.profiles;
                const prof = profiles[value];
                if (!value.match(/^[a-z][a-z0-9\-\.]+$/)) {
                    message = 'Invalid Steem Username';
                } else {
                    if (!this.props.profile.profiles[value]) {
                        this.props.getAuthorProfiles([value]);
                    }
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, to: message } });

                break;
            case 'amount':
                if (parseFloat(value) <= 0) {
                    message = 'Amount cannot be 0 or less than 0';
                } else if (value !== parseFloat(value).toFixed(3)) {
                    message = 'Amount must be in 3 decimal places (e.g. 1.521, 1.000)';
                }

                this.setState({
                    errorMessage: {
                        ...this.state.errorMessage,
                        amount: message,
                    },
                });
                break;
            case 'currency':
                if (!(value === 'STEEM' || value === 'SBD')) {
                    this.setState({
                        errorMessage: {
                            ...this.state.errorMessage,
                            currency: 'Invalid currency',
                        },
                    });
                }
                break;
            case 'memo':
                break;
        }
    };

    render() {
        const { to, amount, currency, memo } = this.state;
        const { profile, username } = this.props;
        const { isLoading, profiles } = profile;

        return (
            <React.Fragment>
                <Confirm title="Enter your password" message={this.getMessage()} updatePassword={this.updatePassword} />
                <Info />
                <div className="Login__Container--Outer">
                    <div className="Login__Container">
                        <h1 className="Login__Title">Transfer</h1>
                        {profiles[username] ? (
                            <div style={{ fontSize: '5rem' }}>
                                <p>@{this.props.username}</p>
                                <p>{`${profiles[username].balance}`}</p>
                                <p>{`${profiles[username].sbd_balance}`}</p>
                            </div>
                        ) : (
                            undefined
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="Form__Container">
                                {/* ========== FROM ========== */}
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
                                {/* ========== TO ========== */}
                                {this.state.errorMessage.to ? (
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
                                {/* ========== MEMO ========== */}
                                {this.state.errorMessage.memo ? (
                                    <b style={{ color: 'red' }}>{this.state.errorMessage.memo}</b>
                                ) : (
                                    undefined
                                )}
                                <label>
                                    <b>
                                        <Tooltips hoverText={'Memo'} tooltipsText={'Memo message for the transaction'} />
                                    </b>
                                </label>
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="Enter Memo"
                                    name="memo"
                                    value={memo}
                                />
                                {/* ========== AMOUNT ========== */}
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
                                    placeholder="Enter Amount"
                                    name="amount"
                                    value={amount}
                                    step="0.001"
                                    required
                                />
                                {/* ========== CURRENCY ========== */}
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
                                {/* ========== SUBMIT ========== */}
                                <button className="Btn__Submit" type="submit">
                                    Send Transaction
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
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
            openInfo: openInfo,
            openConfirm: openConfirm,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Transaction);

import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Tooltips from '../../Tooltips';
import { RootAction } from 'Types';
import { signInInit } from '../SignInAction';

interface ILoginProps {
    signInInit: (username: string, activeKey: string, password: string) => void;
}

interface ILoginState {
    errorMessage: {
        username: string;
        password: string;
        retyped_password: string;
        active: string;
    };
    username: string;
    password: string;
    retyped_password: string;
    active: string;
    understand: boolean;
}

class Login extends React.Component<ILoginProps, ILoginState> {
    state = {
        errorMessage: {
            username: ' ',
            password: ' ',
            retyped_password: ' ',
            active: ' ',
        },
        username: '',
        password: '',
        retyped_password: '',
        active: '',
        understand: false,
    };

    passwordRef: React.Ref<HTMLInputElement>;
    retypedPasswordRef: React.Ref<HTMLInputElement>;
    activeKeyRef: React.Ref<HTMLInputElement>;

    constructor(props: ILoginProps) {
        super(props);
        this.passwordRef = React.createRef();
        this.retypedPasswordRef = React.createRef();
        this.activeKeyRef = React.createRef();
    }

    handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        console.log(value);
        this.setState({ understand: value });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.validateField('password', this.state.password);
        this.validateField('retyped_password', this.state.retyped_password);
        this.validateField('username', this.state.username);
        this.validateField('active', this.state.active);

        if (
            this.state.errorMessage.password === '' &&
            this.state.errorMessage.retyped_password === '' &&
            this.state.errorMessage.username === '' &&
            this.state.errorMessage.active === ''
        ) {
            this.props.signInInit(this.state.username, this.state.active, this.state.password);
        } else {
            toastr.error('Error on logging in', 'Sign in form not completed yet.');
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const s = {};
        const name = e.target.name;
        const value = e.target.value;
        s[name] = value;
        this.setState(s, () => this.validateField(name, value));
    };

    validateField = (name: string, value: string) => {
        let message;
        switch (name) {
            case 'password':
                if (value.length < 6) {
                    message = 'Password too short';
                } else if (value.search(/[a-z]/) < 0) {
                    message = 'Your password needs a lower case letter';
                } else if (value.search(/[A-Z]/) < 0) {
                    message = 'Your password needs an upper case letter';
                } else if (value.search(/[0-9]/) < 0) {
                    message = 'Your password needs a number';
                } else {
                    message = '';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, password: message } });
                break;
            case 'retyped_password':
                if (this.state.password === value) {
                    message = '';
                } else {
                    message = 'password not match';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, retyped_password: message } });
                break;
            case 'username':
                if (!value.match(/^[a-z][a-z0-9\-\.]+$/)) {
                    message = 'Invalid Steem Username';
                } else {
                    message = '';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, username: message } });
                break;
            case 'active':
                if (value.length === 51 && value.startsWith('5')) {
                    message = '';
                } else {
                    message = 'Invalid Active Key';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, active: message } });
                break;
        }
    };

    render() {
        return (
            <div className="Login__Container--Outer">
                <div className="Login__Container">
                    <h1 className="Login__Title">Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="Form__Container">
                            {/* ========== Username ========== */}
                            {this.state.errorMessage.username ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.username}</b>
                            ) : (
                                undefined
                            )}
                            <label>
                                <b>
                                    <Tooltips hoverText={'Username'} tooltipsText={'Your Steemit Username.'} />
                                </b>
                            </label>
                            <input
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                value={this.state.username}
                                required
                            />
                            {this.state.errorMessage.active ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.active}</b>
                            ) : (
                                undefined
                            )}
                            <label>
                                <b>
                                    <Tooltips
                                        hoverText={'Steem Active Key'}
                                        tooltipsText={'Use Steem Active Key to login to the wallet.'}
                                    />
                                </b>
                            </label>
                            <input
                                ref={this.activeKeyRef}
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Enter Steem Active Key"
                                name="active"
                                value={this.state.active}
                                required
                            />

                            {this.state.errorMessage.password ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.password}</b>
                            ) : (
                                undefined
                            )}

                            <label>
                                <b>
                                    <Tooltips
                                        hoverText={'Password'}
                                        tooltipsText={'Choose a secure password to encrypt your steem active key.'}
                                    />
                                </b>
                            </label>
                            <input
                                ref={this.passwordRef}
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={this.state.password}
                                required
                            />
                            {this.state.errorMessage.retyped_password ? (
                                <b style={{ color: 'red' }}>{this.state.errorMessage.retyped_password}</b>
                            ) : (
                                undefined
                            )}
                            <label>
                                <b>Retype Password</b>
                            </label>
                            <input
                                ref={this.retypedPasswordRef}
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Retype your Password"
                                name="retyped_password"
                                value={this.state.retyped_password}
                                required
                            />
                            <label className="Checkbox__Container">
                                <input onChange={this.handleCheckboxChange} name="understand" type="checkbox" />
                                <span>
                                    I understand that there is no way SWW able to retrace my password, and I will take full
                                    responsibility on my password.
                                </span>
                            </label>
                            <button className="Btn__Submit" type="submit" disabled={!this.state.understand}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            signInInit: signInInit,
        },
        dispatch,
    );

export default connect(
    null,
    mapDispatchToProps,
)(Login);

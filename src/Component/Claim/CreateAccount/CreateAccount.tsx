import * as React from 'react';
import Info from 'Component/Shared/Modal/Info/Info';
import Confirm from 'Component/Shared/Modal/Confirm/Confirm';
import Tooltips from 'Component/Shared/Tooltips';

interface ICreateAccountState {
    errorMessage: {
        username: string;
    };
    username: string;
    password: string;
    passwordVisible: boolean;
}

class CreateAccount extends React.Component<{}, ICreateAccountState> {
    state = {
        errorMessage: {
            username: ' ',
            password: ' ',
        },
        username: '',
        password: '',
        passwordVisible: false,
    };
    updatePassword = (password: string) => {};

    getMessage = () => {
        return ``;
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            case 'username':
                if (!value.match(/^[a-z][a-z0-9\-\.]+$/)) {
                    message = 'Invalid Steem Username';
                } else {
                    message = '';
                }
                this.setState({ errorMessage: { ...this.state.errorMessage, username: message } });
                break;
        }
    };

    togglePassword = () => {
        this.setState({ passwordVisible: !this.state.passwordVisible });
    };

    render() {
        return (
            <React.Fragment>
                <Info />
                <Confirm title="" message="" updatePassword={this.updatePassword} />
                <div className="Login__Container--Outer">
                    {false ? (
                        <div className="Login__Container">
                            <h1 className="Login__Title">Register Discounted Account</h1>
                            <p className="Login__Description">Create an account using Resource Credit.</p>
                            <p className="Login__Description" style={{ color: 'red' }}>
                                Do take note that it consume a lot of RC.
                            </p>
                            <form onSubmit={this.handleSubmit} className="Form__Container">
                                {/* ========== New Account Name ========== */}
                                {this.state.errorMessage.username ? (
                                    <b style={{ color: 'red' }}>{this.state.errorMessage.username}</b>
                                ) : (
                                    undefined
                                )}
                                <label>
                                    <b>
                                        <Tooltips
                                            hoverText="New Account Name"
                                            tooltipsText="The username for the new account to be register on Steem blockchain"
                                        />
                                    </b>
                                </label>
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="new account username"
                                    name="username"
                                    value={this.state.username}
                                    required
                                />
                                {/* ========= New Account Password ========= */}
                                {this.state.errorMessage.password ? (
                                    <b style={{ color: 'red' }}>{this.state.errorMessage.password}</b>
                                ) : (
                                    undefined
                                )}
                                <label>
                                    <b>
                                        <Tooltips
                                            hoverText="New Account Password"
                                            tooltipsText="The password for the new account to be register on Steem blockchain"
                                        />
                                    </b>
                                </label>
                                <input
                                    onChange={this.handleChange}
                                    type={this.state.passwordVisible ? 'text' : 'password'}
                                    placeholder="new account username"
                                    name="password"
                                    value={this.state.password}
                                    required
                                />
                                <span>
                                    <input type="checkbox" onChange={this.togglePassword} />
                                    Show Password {this.state.passwordVisible}
                                </span>
                                <button type="submit" className="Btn__Submit">
                                    Claim Account
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="Login__Container">
                            <h1 className="Login__Title">Work in progress</h1>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default CreateAccount;

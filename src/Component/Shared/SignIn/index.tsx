import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from 'Types';
import { signInInit, signOut } from './SignInAction';
import Loading from './Loading/Loading';
import Login from './Login';
import Wallet from './Wallet';
import { getIsLoading, getIsSignIn, getUsername } from './SignInSelector';

interface ISignInProps {
    isLoading: boolean;
    isSignIn: boolean;
    username: string;
    signInInit: (username: string, activeKey: string, password: string) => void;
    signOut: () => void;
}

interface ISignInState {}

class SignIn extends React.Component<ISignInProps, ISignInState> {
    render() {
        const { isLoading, isSignIn, username } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (isSignIn) {
            return (
                <div className="Wallet__Container--Main">
                    <Wallet username={username} />
                    <button className="Btn__Signout" onClick={() => this.props.signOut()}>
                        Sign out
                    </button>
                </div>
            );
        }

        return <Login />;
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isLoading: getIsLoading(state),
    isSignIn: getIsSignIn(state),
    username: getUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            signInInit: signInInit,
            signOut: signOut,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

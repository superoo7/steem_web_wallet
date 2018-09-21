import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from 'Types';
import { signInInit } from './SignInAction';
import Loading from './Loading/Loading';
import Login from '../Login';
import { getIsLoading, getIsSignIn, getUsername } from './SignInSelector';

interface ISignInProps {
    isLoading: boolean;
    isSignIn: boolean;
    username: string;
    signInInit: (username: string, activeKey: string, password: string) => void;
}

interface ISignInState {}

class SignIn extends React.Component<ISignInProps, ISignInState> {
    componentDidMount() {}

    render() {
        const { isLoading, isSignIn, username } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (isSignIn) {
            return <div>SIGN IN as {username}</div>;
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
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

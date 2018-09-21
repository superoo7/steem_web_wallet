import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from 'Types';
import { signInInit } from './SignInAction';
import Loading from './Loading/Loading';
import { getIsLoading } from './SignInSelector';

interface ISignInProps {
    signInInit: (username: string, activeKey: string, password: string) => void;
}

interface ISignInState {}

class SignIn extends React.Component<ISignInProps, ISignInState> {
    componentDidMount() {}

    render() {
        return <Loading />;
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isLoading: getIsLoading(state),
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

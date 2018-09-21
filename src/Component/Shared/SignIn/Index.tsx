import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'Types';
import { signInInit } from './SignInAction';
import { connect } from 'react-redux';
import { account } from 'Utils/Steem';


class SignIn extends React.Component<any, any> {
    componentDidMount() {
    }

    render() {

    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isLoading: getIsLoading(state);
})

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
)(SignIn);

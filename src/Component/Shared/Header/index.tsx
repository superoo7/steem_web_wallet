import { RootAction, RootState } from 'Types';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link } from '@reach/router';

import { getIsHamburgerOpen, getIsMobile } from './HeaderSelector';
import { toggleHamburger, updateIsMobile } from './HeaderAction';
import Hamburger from './Hamburger/Hamburger';
import Dropdown from './Dropdown/Dropdown';
import { enquireScreen } from 'Utils/enquire';
import { getIsSignIn } from 'Component/Shared/SignIn/SignInSelector';

export interface IHeaderProps {
    isHamburgerOpen: boolean;
    isMobile: boolean;
    isSignIn: boolean;
    toggleHamburger: () => void;
    updateIsMobile: (isMobile: boolean) => void;
}

interface IState {
    wrapperRef: any;
}

class Header extends React.Component<IHeaderProps, IState> {
    state = {
        wrapperRef: undefined,
    };

    componentDidMount() {
        enquireScreen((b: any) => {
            const isMobile = b ? true : false;
            this.props.updateIsMobile(isMobile);
        });
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUnMount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node: any) => {
        this.setState({ wrapperRef: node });
    };

    handleClickOutside = (event: any) => {
        const wrapperRef = this.state.wrapperRef as any;
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            if (this.props.isHamburgerOpen === true) this.props.toggleHamburger();
        }
    };

    render() {
        const { isHamburgerOpen, toggleHamburger, isMobile, isSignIn } = this.props;
        return (
            <div className="Header__Container--Out">
                <div className="Header__Container--In">
                    <div ref={this.setWrapperRef} className={`${isHamburgerOpen ? 'Header__Button--Active' : ''} Header__Button`}>
                        <Hamburger isHamburgerOpen={isHamburgerOpen} toggleButton={toggleHamburger} />
                        <Dropdown isHamburgerOpen={isHamburgerOpen} toggleButton={toggleHamburger} isSignIn={isSignIn} />
                    </div>
                    <Link className="Header__Title" to="/">
                        {isMobile ? '[SWW]' : 'Steem Web Wallet [SWW]'}
                    </Link>
                    <div />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isHamburgerOpen: getIsHamburgerOpen(state),
    isMobile: getIsMobile(state),
    isSignIn: getIsSignIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            toggleHamburger: toggleHamburger,
            updateIsMobile: updateIsMobile,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

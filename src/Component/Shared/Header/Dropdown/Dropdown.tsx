import * as React from 'react';
import { Link } from '@reach/router';

interface IDropdownProps {
    isHamburgerOpen: boolean;
    isSignIn: boolean;
    toggleButton: () => void;
}

const Dropdown = (props: IDropdownProps) => {
    return (
        <div className="Dropdown__Content" style={{ display: props.isHamburgerOpen ? 'block' : 'none' }}>
            <Link onClick={props.toggleButton} to="/">
                Home
            </Link>
            {props.isSignIn ? (
                <React.Fragment>
                    <Link onClick={props.toggleButton} to="/transfer">
                        Make Transactions
                    </Link>
                    <Link onClick={props.toggleButton} to="/claim">
                        Claim/Create Account
                    </Link>
                </React.Fragment>
            ) : (
                undefined
            )}
            <Link onClick={props.toggleButton} to="/qr">
                QR Reader
            </Link>
            <Link onClick={props.toggleButton} to="/faq">
                FAQ
            </Link>
            <Link onClick={props.toggleButton} to="/settings">
                Settings
            </Link>
        </div>
    );
};

export default Dropdown;

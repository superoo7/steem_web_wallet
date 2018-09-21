import * as React from 'react';
import { Link } from '@reach/router';

interface IDropdownProps {
    isHamburgerOpen: boolean;
    toggleButton: () => void;
}

const Dropdown = (props: IDropdownProps) => {
    return (
        <div className="Dropdown__Content" style={{ display: props.isHamburgerOpen ? 'block' : 'none' }}>
            <Link onClick={props.toggleButton} to="/">
                Home
            </Link>
            <Link onClick={props.toggleButton} to="/faq">
                FAQ
            </Link>
            <Link onClick={props.toggleButton} to="/qr">
                QR Reader
            </Link>
        </div>
    );
};

export default Dropdown;

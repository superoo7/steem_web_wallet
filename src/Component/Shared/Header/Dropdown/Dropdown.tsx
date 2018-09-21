import * as React from 'react';
import { Link } from '@reach/router';

interface IDropdownProps {
    isHamburgerOpen: boolean;
}

const Dropdown = (props: IDropdownProps) => {
    return (
        <div className="Dropdown__Content" style={{ display: props.isHamburgerOpen ? 'block' : 'none' }}>
            <Link to="/">Link 1</Link>
            <Link to="/">Link 1</Link>
            <Link to="/">Link 1</Link>
        </div>
    );
};

export default Dropdown;

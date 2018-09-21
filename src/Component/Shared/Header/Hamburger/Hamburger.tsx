import * as React from 'react';

interface IHamburgerProps {
    isHamburgerOpen: boolean;
    toggleButton: () => void;
}

const Hamburger: React.StatelessComponent<IHamburgerProps> = (props: IHamburgerProps) => {
    const isOpen = props.isHamburgerOpen;
    const buttonStyle = isOpen ? 'Hamburger__Bar--Change' : '';
    return (
        <div className="Hamburger__Container" onClick={props.toggleButton}>
            <div className={`Hamburger__Bar--1 ${buttonStyle} Hamburger__Bar`} />
            <div className={`Hamburger__Bar--2 ${buttonStyle} Hamburger__Bar`} />
            <div className={`Hamburger__Bar--3 ${buttonStyle} Hamburger__Bar`} />
        </div>
    );
};

export default Hamburger;

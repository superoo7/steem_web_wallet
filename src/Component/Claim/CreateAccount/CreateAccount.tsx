import * as React from 'react';
import Info from 'Component/Shared/Modal/Info/Info';
import Confirm from 'Component/Shared/Modal/Confirm/Confirm';

class CreateAccount extends React.Component {
    updatePassword = (password: string) => {};

    getMessage = () => {
        return ``;
    };

    render() {
        return (
            <React.Fragment>
                <div className="Login__Container--Outer">
                    <div className="Login__Container">
                        <h1 className="Login__Title">Register Discounted Account</h1>
                        <p className="Login__Description">Work in progress</p>
                        {/* <p className="Login__Description" style={{ color: 'red' }}>
                            Do take note that it consume a lot of RC.
                        </p>
                        <button className="Btn__Submit">Claim Account</button> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateAccount;

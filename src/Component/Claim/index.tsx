import * as React from 'react';
import ClaimAccount from './ClaimAccount/ClaimAccount';
import Create from './CreateAccount/CreateAccount';

const Claim = () => (
    <React.Fragment>
        <div className="Login__Container--Outer">
            <div className="Login__Container">
                <h1 className="Login__Title">Claim Account / Create Discounted Account</h1>
                <p className="Login__Description">
                    After Hardfork 20, Steem introduced a feature call Claiming account and create discounted account. This
                    basically allowing account creation using Resource Credit (RC).
                </p>
            </div>
        </div>

        <ClaimAccount />
        <Create />
    </React.Fragment>
);

export default Claim;

import * as React from 'react';
import ClaimAccount from './ClaimAccount/ClaimAccount';
import Create from './CreateAccount/CreateAccount';

interface IClaimState {
    tab: 'claim' | 'register';
}

class Claim extends React.Component<{}, IClaimState> {
    state = {
        tab: 'register' as 'register',
    };
    changeTab = (tab: 'claim' | 'register') => {
        this.setState({ tab: tab });
    };
    render() {
        return (
            <React.Fragment>
                <div className="Login__Container--Outer">
                    <div className="Login__Container">
                        <h1 className="Login__Title">Claim Account / Create Discounted Account</h1>
                        <p className="Login__Description">
                            After Hardfork 20, Steem introduced a feature call Claiming account and create discounted account.
                            This basically allowing account creation using Resource Credit (RC).
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button className="Btn__Submit" onClick={() => this.changeTab('claim')}>
                        Claim
                    </button>
                    <button className="Btn__Submit" onClick={() => this.changeTab('register')}>
                        Register
                    </button>
                </div>
                {this.state.tab === 'register' ? <Create /> : <ClaimAccount />}
            </React.Fragment>
        );
    }
}

export default Claim;

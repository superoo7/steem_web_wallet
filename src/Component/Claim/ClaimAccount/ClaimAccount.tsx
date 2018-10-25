import * as React from 'react';
import { getItem } from 'localforage';
import Info from 'Component/Shared/Modal/Info/Info';
import Confirm from 'Component/Shared/Modal/Confirm/Confirm';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'Types';
import { openConfirm, openInfo } from 'Component/Shared/Modal/ModalAction';
import { localForageKey } from 'Utils/LocalForage';
import { account } from 'Utils/Steem';
import { getUsername } from 'Component/Shared/SignIn/SignInSelector';

interface IClaimAccountProps {
    username: string;
    openConfirm: () => void;
    openInfo: (message: string) => void;
}

class ClaimAccount extends React.Component<IClaimAccountProps, {}> {
    updatePassword = async (password: string) => {
        const aesPW = password;
        const aesEnc: string = (await getItem(localForageKey.WALLET_AES_ACTIVE)) as string;
        try {
            const activeKey = account.decryptData(aesEnc, aesPW);

            account
                .claimAccount(this.props.username, activeKey)
                .then((d: any) => {
                    this.props.openInfo(`Successfully claimed account!\n
                        id: ${d.id}\n
                        block number: ${d.block_num}\n
                        trx number: ${d.trx_num}
                        `);
                })
                .catch(err => {
                    const error = String(err) === '[object Object]' ? JSON.stringify(err) : String(err);
                    this.props.openInfo(error);
                });
        } catch (err) {
            const error = String(err) === '[object Object]' ? JSON.stringify(err) : String(err);
            this.props.openInfo(error);
        }
    };

    getMessage = () => {
        return `Confirm to claim an account with @${this.props.username}`;
    };

    handleClaim = () => {
        this.props.openConfirm();
    };

    render() {
        return (
            <React.Fragment>
                <Confirm title="Enter your password" message={this.getMessage()} updatePassword={this.updatePassword} />
                <Info />
                <div className="Login__Container--Outer">
                    <div className="Login__Container">
                        <h1 className="Login__Title">Claim Account</h1>
                        <p className="Login__Description">
                            Claim account basically just claim account without create any discounted account.
                        </p>
                        <p className="Login__Description" style={{ color: 'red' }}>
                            Do take note that it consume a lot of RC. (You need to have at least 3k-4k SP to do this)
                        </p>
                        <button className="Btn__Submit" onClick={this.handleClaim}>
                            Claim Account
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: any) => ({
    username: getUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            openConfirm: openConfirm,
            openInfo: openInfo,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ClaimAccount);

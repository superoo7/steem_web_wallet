import * as React from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import Tooltips from 'Component/Shared/Tooltips';
import { API } from 'Utils/Steem/SteemAPI';
import { enum2Array } from 'Utils/enum2Array';
import { connect } from 'react-redux';
import { RootState, RootAction } from 'Types';
import { Dispatch, bindActionCreators } from 'redux';
import { setAPI } from '../SettingsAction';
import { getApi } from '../SettingsSelector';
import { toastr } from 'react-redux-toastr';
import steem from 'Utils/Steem';

interface ISteemApiProps {
    setApi: (api: API) => void;
    api: API;
}

interface ISteemApiState {
    color: string;
    status: string;
}

class SteemApi extends React.Component<ISteemApiProps, ISteemApiState> {
    state = { color: 'grey', status: '' };

    componentDidMount() {}

    componentDidUpdate() {
        toastr.success(`Sucessfully changed RPC to`, `${this.props.api}`);
    }

    handleSelectChange = (value: ValueType<{ value: any; label: any }>) => {
        const val = value as { value: API; label: API };
        const api = val.value;
        this.props.setApi(api);
    };

    testConnection = () => {
        this.setState({
            color: 'grey',
            status: 'loading',
        });
        steem.checkConnection().subscribe(
            res => {
                if (res.jsonrpc === '2.0') {
                    this.setState({ color: 'green', status: `${steem.api.split('https://')[1]} is online` });
                }
            },
            err => {
                this.setState({ color: 'red', status: `${steem.api.split('https://')[1]} is offline / unavailable` });
            },
        );
    };

    render() {
        const { api } = this.props;
        const { status, color } = this.state;
        const apiArr = enum2Array(API);
        const apiOption = apiArr.map(d => ({
            value: d,
            label: d,
        }));

        return (
            <React.Fragment>
                <div style={{ fontSize: '2rem', textAlign: 'center' }}>
                    <h3 className="Login__Description">
                        <Tooltips hoverText="Steem API" tooltipsText="API for steem" />
                    </h3>
                    <p>
                        Blockchain should not have single point of failure, therefore you can swith to your favourite RPC endpoint
                        using this wallet. (Testnet still not working yet)
                    </p>
                    <br />
                    <Select onChange={this.handleSelectChange} options={apiOption} value={{ value: api, label: api }} />
                </div>
                <br />
                <div style={{ fontSize: '2rem', textAlign: 'center' }}>
                    <h3 className="Login__Description">
                        <Tooltips hoverText="Test Connection" tooltipsText="Test Connection from the RPC" />
                    </h3>
                    <p>Test connection based on the RPC set above.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <button className="Btn__Submit" onClick={this.testConnection}>
                            Test Connection
                        </button>
                        <div>
                            <div
                                id="display"
                                style={{ width: '2rem', height: '2rem', background: color, borderRadius: '1rem' }}
                            />
                            <p style={{ maxWidth: '10rem' }}>{status}</p>
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    api: getApi(state),
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            setApi: setAPI,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SteemApi);

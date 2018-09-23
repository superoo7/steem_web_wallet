import { Client, PrivateKey, ClientOptions } from 'dsteem';
import { race, timer, from, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { API } from './SteemAPI';

export interface SteemClass {
    api: API;
    client: Client;
    getClient: () => Client;
    setClient: (api: API) => void;
    checkConnection: () => Observable<any>;
    findAccount: (acc: string) => Promise<any>;
    findAccounts: (acc: string[]) => Promise<any>;
    getDynamicGlobalProperties: () => Promise<any>;
}

class Steem implements SteemClass {
    public api: API;
    public client: Client;

    constructor(api: API = API.steemit, opt?: ClientOptions) {
        this.api = api;
        this.client = new Client(api, opt);
    }

    getClient = () => this.client;

    setClient = (api: API) => {
        this.api = api;
        this.client = new Client(api);
    };

    getDynamicGlobalProperties = () => {
        const dataString = '{"jsonrpc":"2.0", "method":"condenser_api.get_dynamic_global_properties", "params":[], "id":1}';
        return fetch(`${this.api}`, { method: 'POST', body: dataString }).then(d => d.json());
    };

    checkConnection = () => {
        const getData = this.getDynamicGlobalProperties();
        return race(timer(5000).pipe(mapTo('Timeout')), from(getData));
    };

    findAccount = (acc: string) => this.client.database.call('get_accounts', [[acc]]);
    findAccounts = (acc: string[]) => this.client.database.call('get_accounts', [acc]);
}

export default Steem;

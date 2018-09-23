import dotenv from 'dotenv';
import { timer, from, race } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Client, PrivateKey } from 'dsteem';

import Steem, { SteemClass } from '../Steem';
import Account, { AccountClass } from '../Account';
import { API } from '../SteemAPI';
import steem, { account } from '../index';

dotenv.config();

// set jest timeout longer
jest.setTimeout(10000);

describe('Transaction', () => {
    let steem: SteemClass, account: AccountClass;
    let ownerKey: string, activeKey: string, username: string;

    beforeAll(() => {
        steem = new Steem(API.steemit);
        account = new Account(steem);
        ownerKey = process.env.STEEM_OWNER_KEY as string;
        activeKey = process.env.STEEM_ACTIVE_KEY as string;
        username = process.env.STEEM_USERNAME as string;
    });

    it('Send steem', done => {
        account
            .sendTransactionRx({
                from: username,
                to: 'superoo7',
                amount: '1000.010',
                currency: 'SBD',
                memo: 'SWW',
                activeKey: activeKey,
            })
            .then(d => {
                console.log(d);

                done();
            })
            .catch(e => {
                console.log(e.message);
                console.log(typeof e.message);
                done();
            });
    });
});

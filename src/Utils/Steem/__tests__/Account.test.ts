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

xdescribe('Account', () => {
    let steem: SteemClass, account: AccountClass;
    let ownerKey: string, activeKey: string, username: string;

    beforeAll(() => {
        steem = new Steem(API.steemit);
        account = new Account(steem);
        ownerKey = process.env.STEEM_OWNER_KEY as string;
        activeKey = process.env.STEEM_ACTIVE_KEY as string;
        username = process.env.STEEM_USERNAME as string;
    });

    xit('get correct key', async () => {
        const d = await steem.client.database.call('get_accounts', [['ned']]).catch(err => console.error(err));
        console.log(d[0].owner.key_auths[0][0]);
        console.log(d[0].active.key_auths[0][0]);
    });

    xit('checks for validity of active key', done => {
        const accountObservable = account.verifyAccount(username, activeKey);
        accountObservable.subscribe(
            d => {
                expect(d.type).toBe('active');
                done();
            },
            err => {
                console.error(err);
                throw new Error('INVALID PASSOWRD');
            },
        );
    });

    xit('decrypted active key with aes', done => {
        const aesPW = 'abc';
        account
            .generateEncData(username, activeKey, aesPW)
            .pipe(
                mergeMap(d => {
                    return account.getPrivateKey(username, d.encryptedMessage, aesPW);
                }),
            )
            .subscribe(d => {
                expect(d.type).toBe('active');
                expect(d.key).toBe(activeKey);
                done();
            });
    });

    xit('Generate Public', () => {
        const a = PrivateKey.fromLogin(username, activeKey).toString();
        console.log(a);
        // console.log(a.createPublic());
    });

    it('encrypted and decrypted message correctly', () => {
        const pw = 'abc123';
        const message = 'testing';
        const aesKey = account.encryptData(message, pw);
        expect(account.decryptData(aesKey, pw)).toBe(message);
    });

    it('should failed invalid aes', () => {
        const pw = 'abc123';
        const message = 'testing';
        const aesKey = account.encryptData(message, pw);
        try {
            const data = account.decryptData(aesKey, 'invalidpw');
        } catch (err) {
            expect(err.message).toBe('Invalid password');
        }
    });
});

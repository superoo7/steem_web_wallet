import { PrivateKey } from 'dsteem/lib';
import { from, Observable, empty, throwError } from 'rxjs';
import { SteemClass } from './Steem';
import { map, mergeMap } from 'rxjs/operators';
import CryptoJS, { AES } from 'crypto-js';

export interface AccountClass {
    steem: SteemClass;
    generateEncData: (
        username: string,
        password: string,
        aesPassword: string,
    ) => Observable<{ type: string; encryptedMessage: string }>;
    getPrivateKey: (username: string, encryptedKey: string, aesPassword: string) => Observable<{ type: string; key: string }>;
    verifyAccount: (
        username: string,
        password: string,
    ) => Observable<{ username: string; ownerPublicKey: string; activePublicKey: string; type: string }>;
    encryptData: (message: string, key: string) => string;
    decryptData: (encryptedMessage: string, key: string) => string;
}

class Account implements AccountClass {
    public steem: SteemClass;

    constructor(steem: SteemClass) {
        this.steem = steem;
    }

    generateEncData = (username: string, password: string, aesPassword: string) => {
        return this.verifyAccount(username, password).pipe(
            map(d => {
                const type = d.type;
                const encryptedMessage = this.encryptData(password, aesPassword);

                return {
                    type: type,
                    encryptedMessage: encryptedMessage,
                };
            }),
        );
    };

    getPrivateKey = (username: string, encryptedKey: string, aesPassword: string) => {
        const pw = this.decryptData(encryptedKey, aesPassword);
        return this.verifyAccount(username, pw).pipe(
            map(d => ({
                type: d.type,
                key: pw,
            })),
        );
    };

    getPublicKey = (username: string) => {
        // d[0].owner.key_auths[0][0]
        // d[0].active.key_auths[0][0]
        const userData = from(this.steem.findAccount(username)).pipe(
            map(d => ({
                username: username,
                ownerPublicKey: d[0].owner.key_auths[0][0] as string,
                activePublicKey: d[0].active.key_auths[0][0] as string,
            })),
        );
        return userData;
    };

    verifyAccount = (username: string, password: string) => {
        try {
            const key = PrivateKey.fromString(password);
            const publicKey = key.createPublic().toString();
            const userData = from(this.steem.findAccount(username)).pipe(
                map(d => {
                    const ownerPublicKey = d[0].owner.key_auths[0][0] as string;
                    const activePublicKey = d[0].active.key_auths[0][0] as string;
                    let type;
                    if (publicKey === activePublicKey) {
                        type = 'active';
                    } else {
                        throw new Error('Password is not Active Key');
                    }
                    return {
                        username: username,
                        ownerPublicKey: ownerPublicKey,
                        activePublicKey: activePublicKey,
                        type: type,
                    };
                }),
            );
            return userData;
        } catch (err) {
            if (err.message) return throwError(err.message);
            return throwError('Invalid Password');
        }
    };

    encryptData = (message: string, key: string) => {
        const enc = JSON.stringify({ message: message, verify: true });
        const encrypted = AES.encrypt(enc, key);
        return encrypted.toString();
    };

    decryptData = (encryptedMessage: string, key: string) => {
        const decrypted = AES.decrypt(encryptedMessage, key);
        let temp;
        try {
            temp = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (err) {
            temp = { verify: false };
        }
        if (temp.verify === true) {
            return temp.message;
        } else {
            throw new Error('Invalid password');
        }
    };
}

export default Account;

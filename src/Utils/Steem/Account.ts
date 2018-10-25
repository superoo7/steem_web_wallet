import dsteem, { PrivateKey, SignedTransaction, Transaction, Asset, Operation } from 'dsteem';
import { from, Observable, empty, throwError } from 'rxjs';
import { SteemClass } from './Steem';
import { map } from 'rxjs/operators';
import { AES, enc } from 'crypto-js';
import * as buffer from 'buffer';

export interface AccountClass {
    steem: SteemClass;

    sendTransactionRx: (transaction: TransactionRx) => Promise<dsteem.TransactionConfirmation>;

    transactionGenerator: (
        from: string,
        to: string,
        amount: string | number,
        currency: Currency,
        memo: string,
        activeKey: string,
        dynamicGlobalProperties: any,
    ) => dsteem.SignedTransaction;
    verifyTransaction: (stx: dsteem.SignedTransaction) => Promise<boolean>;
    sendTransaction: (stx: dsteem.SignedTransaction) => Promise<dsteem.TransactionConfirmation>;

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

type Currency = 'STEEM' | 'SBD';

interface TransactionRx {
    from: string;
    to: string;
    amount: string | number;
    currency: Currency;
    memo: string;
    activeKey: string;
}

class Account implements AccountClass {
    public steem: SteemClass;

    constructor(steem: SteemClass) {
        this.steem = steem;
    }

    // ============================================================
    // Claim account with RC
    // ============================================================

    claimAccount = (username: string, privateKey: string) => {
        const ops: Operation[] = [
            [
                'claim_account',
                {
                    creator: username,
                    fee: '0.000 STEEM',
                    extensions: [],
                },
            ],
        ];
        return this.steem.client.broadcast.sendOperations(ops, PrivateKey.fromString(privateKey));
    };

    // ============================================================
    // Create account
    // ============================================================

    // ============================================================
    // Transaction Related
    // ============================================================

    sendTransactionRx = async (transaction: TransactionRx) => {
        try {
            const dynamicGlobalProperties = await this.steem.getDynamicGlobalProperties();
            const { from, to, amount, currency, memo, activeKey } = transaction;
            const stx = this.transactionGenerator(from, to, amount, currency, memo, activeKey, dynamicGlobalProperties);
            const verify = await this.verifyTransaction(stx);
            if (verify !== true) {
                throw new Error('Failed to verify transaction');
            }
            return this.sendTransaction(stx);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    transactionGenerator = (
        from: string,
        to: string,
        amount: string | number,
        currency: Currency,
        memo: string,
        activeKey: string,
        dynamicGlobalProperties: any,
    ) => {
        const head_block_number = dynamicGlobalProperties.result.head_block_number;
        const head_block_id = dynamicGlobalProperties.result.head_block_id;
        // https://github.com/feross/buffer
        const refblock_prefix = new buffer.Buffer(head_block_id, 'hex').readUInt32LE(4);
        const op: Transaction = {
            ref_block_num: head_block_number, //reference head block number required by tapos (transaction as proof of stake)
            ref_block_prefix: refblock_prefix, //reference buffer of block id as prefix
            expiration: new Date(Date.now() + 200000).toISOString().slice(0, -5), //set expiration time for transaction (+1 min)
            operations: [
                [
                    'transfer',
                    {
                        from: from,
                        to: to,
                        amount: `${amount} ${currency}`,
                        memo: memo,
                    },
                ],
            ],
            extensions: [], //extensions for this transaction
        };
        const dsteemkey = PrivateKey.fromString(activeKey);
        return this.steem.client.broadcast.sign(op, dsteemkey);
    };

    verifyTransaction = (stx: SignedTransaction) => {
        return this.steem.client.database.verifyAuthority(stx);
    };

    sendTransaction = (stx: SignedTransaction) => {
        return this.steem.client.broadcast.send(stx);
    };

    // ============================================================
    // Account Sign In relate
    // ============================================================

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
            temp = JSON.parse(decrypted.toString(enc.Utf8));
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

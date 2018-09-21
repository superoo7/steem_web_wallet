import { RootAction } from 'types';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { map, filter, mergeMap, flatMap } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { setItem, getItem } from 'localforage';
import { account } from 'Utils/Steem';
import { localForageKey } from 'Utils/LocalForage';

import { SignInActionsType, SignInActions, signInFullfilled } from './SignInAction';

export const signInEpic: Epic<SignInActions, SignInActions, RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SignInActionsType.SIGN_IN_INIT)),
        mergeMap(action => {
            const { username, activeKey, password } = action.payload;
            return from(account.generateEncData(username, activeKey, password)).pipe(
                mergeMap(d => {
                    return forkJoin(
                        from(setItem(localForageKey.WALLET_AES_ACTIVE, d.encryptedMessage)),
                        from(setItem(localForageKey.USERNAME, username)),
                    ).pipe(
                        map(_d => {
                            return signInFullfilled(username, d.encryptedMessage);
                        }),
                    );
                }),
            );
        }),
    );

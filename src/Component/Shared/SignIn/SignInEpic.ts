import { RootAction } from 'Types';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { map, filter, mergeMap, tap, catchError } from 'rxjs/operators';
import { from, forkJoin, of } from 'rxjs';
import { setItem, getItem } from 'localforage';
import { toastr } from 'react-redux-toastr';
import { account } from 'Utils/Steem';
import { localForageKey } from 'Utils/LocalForage';

import { SignInActionsType, SignInActions, signInFullfilled, signInFreshFullfilled, signInError } from './SignInAction';

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
                catchError(err => {
                    toastr.error('Error on logging in', `${err.message}`);
                    return of(signInError());
                }),
            );
        }),
    );

export const signInFreshEpic: Epic<SignInActions, SignInActions, RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SignInActionsType.SIGN_IN_FRESH)),
        mergeMap(_action => {
            return forkJoin(
                from(getItem(localForageKey.USERNAME) as Promise<string>),
                from(getItem(localForageKey.WALLET_AES_ACTIVE) as Promise<string>),
            ).pipe(
                tap(d => {
                    if (d.length === 2 && !!d[0] && !!d[1]) {
                        return toastr.success(`Successfully signed in!`, `Welcome ${d[0]}`);
                    }
                }),
                map(d => {
                    if (d.length === 2 && !!d[0] && !!d[1]) {
                        return signInFreshFullfilled(d[0], d[1]);
                    }
                    return signInError();
                }),
            );
        }),
    );

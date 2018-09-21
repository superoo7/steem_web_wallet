/// <reference path="../../../types.d.ts" />
import Types from 'types';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, tap, map, ignoreElements } from 'rxjs/operators';

import { SignInActionsType, SignInActions } from './SignInAction';

export const signInEpic: Epic<SignInActions, any, Types.RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SignInActionsType.SIGN_IN_INIT)),
        map(action => {
            console.log(action);
        }),
    );

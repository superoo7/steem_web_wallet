import { action, ActionType } from 'typesafe-actions';

export enum SignInActionsType {
    SIGN_IN_INIT = '@ACCOUNT/signin',
    SIGN_IN_FULFILLED = '@ACCOUNT/signin__done',
    SIGN_IN_FRESH = '@ACCOUNT/signin__fresh',
    SIGN_IN_FRESH_FULLFILLED = '@ACCOUNT/signin__fresh__fullfilled',
    SIGN_IN_ERROR = '@ACCOUNT/error',
    SIGN_OUT = '@ACCOUNT/signout',
    SIGN_OUT_FULLFILLED = '@ACCOUNT/signout__fullfilled',
}

export const signInInit = (username: string, activeKey: string, password: string) =>
    action(SignInActionsType.SIGN_IN_INIT, { username: username, activeKey: activeKey, password: password });

export const signInFullfilled = (username: string, aesEncKey: string) =>
    action(SignInActionsType.SIGN_IN_FULFILLED, { username: username, aesEncKey: aesEncKey });

export const signInFresh = () => action(SignInActionsType.SIGN_IN_FRESH);

export const signInFreshFullfilled = (username: string, aesEncKey: string) =>
    action(SignInActionsType.SIGN_IN_FRESH_FULLFILLED, { username: username, aesEncKey: aesEncKey });

export const signInError = () => action(SignInActionsType.SIGN_IN_ERROR);

export const signOut = () => action(SignInActionsType.SIGN_OUT);

export const signOutFulfilled = () => action(SignInActionsType.SIGN_OUT_FULLFILLED);

export type SignInActions =
    | ActionType<typeof signInInit>
    | ActionType<typeof signInFullfilled>
    | ActionType<typeof signInFresh>
    | ActionType<typeof signInFreshFullfilled>
    | ActionType<typeof signInError>
    | ActionType<typeof signOut>
    | ActionType<typeof signOutFulfilled>;

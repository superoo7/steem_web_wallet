import { action, ActionType } from 'typesafe-actions';

export enum SignInActionsType {
    SIGN_IN_INIT = '@ACCOUNT/signin',
    SIGN_IN_FULFILLED = '@ACCOUNT/signin__done',
    SIGN_IN_ERROR = '@ACCOUNT/error',
    SIGN_OUT = '@ACCOUNT/signout',
}

export const signInInit = (username: string, key: string) =>
    action(SignInActionsType.SIGN_IN_INIT, { username: username, key: key });

export const signInFullfilled = (username: string, key: string) =>
    action(SignInActionsType.SIGN_IN_FULFILLED, { username: username, key: key });

export const signInError = () => action(SignInActionsType.SIGN_IN_ERROR);

export const signOut = () => action(SignInActionsType.SIGN_OUT);

export type SignInActions =
    | ActionType<typeof signInInit>
    | ActionType<typeof signInFullfilled>
    | ActionType<typeof signInError>
    | ActionType<typeof signOut>;

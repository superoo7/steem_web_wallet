import { SignInActionsType, SignInActions } from './SignInAction';
import { Reducer } from 'redux';

export type SignInState = {
    readonly username: string;
    readonly aesKey: string;
    readonly isLoading: boolean;
    readonly isSignIn: boolean;
};

export const signInInitialState: SignInState = {
    username: '',
    aesKey: '',
    isLoading: false,
    isSignIn: false,
};

export const signInReducer: Reducer<SignInState, SignInActions> = (state = signInInitialState, action) => {
    switch (action.type) {
        case SignInActionsType.SIGN_IN_INIT:
            return {
                ...state,
                username: action.payload.username,
                aesKey: action.payload.key,
                isLoading: true,
                isSignIn: false,
            };
        case SignInActionsType.SIGN_IN_FULFILLED:
            return {
                ...state,
                username: action.payload.username,
                aesKey: action.payload.key,
                isLoading: false,
                isSignIn: true,
            };
        case SignInActionsType.SIGN_IN_ERROR:
            return signInInitialState;
        case SignInActionsType.SIGN_OUT:
            return state;
        default:
            return state;
    }
};

export type SignInActions = SignInActions;

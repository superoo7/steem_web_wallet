import { RootState } from 'Types';
import { createSelector } from 'reselect';

export const getSignIn = (state: RootState) => state.signIn;

export const getIsLoading = createSelector(getSignIn, signIn => signIn.isLoading);
export const getIsSignIn = createSelector(getSignIn, signIn => signIn.isSignIn);
export const getUsername = createSelector(getSignIn, signin => signin.username);

import { RootState } from 'Types';
import { createSelector } from 'reselect';

export const getSignIn = (state: RootState) => state.signIn;

export const getIsLoading = createSelector(getSignIn, signIn => signIn.isLoading);

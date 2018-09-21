import { createSelector } from 'reselect';
import { RootState } from 'Types';

const getProfiles = (state: RootState) => state.profiles;

export const getProfile = createSelector([getProfiles], profile => profile);

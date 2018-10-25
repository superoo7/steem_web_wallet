import Types from 'Types';
import { createSelector } from 'reselect';

const getSettings = (state: Types.RootState) => state.settings;

export const getApi = createSelector(getSettings, settings => settings.api);

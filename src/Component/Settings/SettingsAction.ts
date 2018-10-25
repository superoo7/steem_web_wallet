import { action, ActionType } from 'typesafe-actions';
import { API } from 'Steem/SteemAPI';

export enum SettingsActionsType {
    SET_API = '@SETTINGS/api',
    SET_API_FULLFILL = '@SETTINGS/api_fulfill',
    API_INIT = '@SETTINGS/api_init',
}

export const setAPI = (api: API) => action(SettingsActionsType.SET_API, { api: api });
export const setAPIFulfill = () => action(SettingsActionsType.SET_API_FULLFILL);
export const apiInit = () => action(SettingsActionsType.API_INIT);

export type SettingsActions = ActionType<typeof setAPI> | ActionType<typeof apiInit> | ActionType<typeof setAPIFulfill>;

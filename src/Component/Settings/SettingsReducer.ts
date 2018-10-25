import { API } from 'Steem/SteemAPI.ts';
import { SettingsActions, SettingsActionsType } from './SettingsAction';
import { Reducer } from 'redux';

export type SettingsState = {
    readonly api: API;
};

export const settingsInitialState: SettingsState = {
    api: API.steemit,
};

export const settingsReducer: Reducer<SettingsState, SettingsActions> = (state = settingsInitialState, action) => {
    switch (action.type) {
        case SettingsActionsType.SET_API:
            return {
                ...state,
                api: action.payload.api,
            };
        case SettingsActionsType.SET_API_FULLFILL:
            return state;
        case SettingsActionsType.API_INIT:
            return state;
        default:
            return state;
    }
};

export type SettingsActions = SettingsActions;

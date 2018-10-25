import { filter, mergeMap, map } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { SettingsActions } from 'Component/Settings/SettingsReducer';
import { RootAction } from 'Types';
import { SettingsActionsType, setAPIFulfill, setAPI } from './SettingsAction';
import { from, of } from 'rxjs';
import { setItem, getItem } from 'localforage';
import { localForageKey } from 'Utils/LocalForage';
import { API } from 'Utils/Steem/SteemAPI';
import steem from 'Utils/Steem';

export const setApiEpic: Epic<SettingsActions, SettingsActions, RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SettingsActionsType.SET_API)),
        mergeMap(action => {
            const { api } = action.payload;
            return from(setItem(localForageKey.API, api)).pipe(
                map(_d => {
                    steem.setClient(api);
                    return setAPIFulfill();
                }),
            );
        }),
    );

export const apiInitEpic: Epic<SettingsActions, SettingsActions, RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SettingsActionsType.API_INIT)),
        mergeMap(_action => {
            return from(getItem(localForageKey.API) as Promise<string>).pipe(
                map(d => {
                    const api = (d as API) || API.steemit;
                    return setAPI(api);
                }),
            );
        }),
    );

import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, mergeMap, mapTo, map } from 'rxjs/operators';
import { RootAction } from 'Types';
import steem from 'Utils/Steem';
import { SteemProfileActionType, SteemProfileActions, errorProfile, setAuthorProfile } from './SteemProfileAction';
import { from, race, timer, of } from 'rxjs';

export const getSteemProfileEpic: Epic<SteemProfileActions, SteemProfileActions, RootAction> = action$ =>
    action$.pipe(
        filter(isOfType(SteemProfileActionType.GET_AUTHOR_PROFILE)),
        mergeMap(action => {
            const profiles = action.payload.authors;
            return race(timer(10000).pipe(mapTo(['timeout'])), from(steem.findAccounts(profiles))).pipe(
                map(d => {
                    if (d.length === 1 && d[0] === 'Timeout') {
                        return errorProfile();
                    }
                    return setAuthorProfile(profiles, d);
                }),
            );
        }),
    );

import { action, ActionType } from 'typesafe-actions';

export enum SteemProfileActionType {
    GET_AUTHOR_PROFILE = '@STEEM/PROFILE/get',
    SET_AUTHOR_PROFILE = '@STEEM/PROFILE/set',
    ERROR = '@STEEM/PROFILE/error',
}

export const getAuthorProfiles = (authors: string[]) =>
    action(SteemProfileActionType.GET_AUTHOR_PROFILE, {
        authors: authors,
    });

export const setAuthorProfile = (authors: string[], data: any[]) =>
    action(SteemProfileActionType.SET_AUTHOR_PROFILE, {
        data: data,
        authors: authors,
    });

export const errorProfile = () => action(SteemProfileActionType.ERROR);

export type SteemProfileActions =
    | ActionType<typeof getAuthorProfiles>
    | ActionType<typeof setAuthorProfile>
    | ActionType<typeof errorProfile>;

import { Reducer } from 'redux';
import { SteemProfileActionType, SteemProfileActions } from './SteemProfileAction';
import { calcVP } from 'Utils/Steem/Calc';

export type SteemProfileState = {
    authors: string[];
    profiles: {
        [key: string]: {
            data: any;
            profile: string;
            cover: string;
            about: string;
            vp: string;
            balance: string;
            sbd_balance: string;
            website: string;
        };
    };
    isLoading: boolean;
};

export const steemProfileInitialState: SteemProfileState = {
    authors: [],
    profiles: {},
    isLoading: false,
};

export const steemProfileReducer: Reducer<SteemProfileState, SteemProfileActions> = (
    state = steemProfileInitialState,
    action,
) => {
    switch (action.type) {
        case SteemProfileActionType.GET_AUTHOR_PROFILE:
            return { ...state, authors: action.payload.authors, isLoading: true };
        case SteemProfileActionType.SET_AUTHOR_PROFILE:
            const imgUrl = 'https://steemitimages.com';
            const data = action.payload.data;
            const profiles = { ...state.profiles };
            data.map(prof => {
                const { balance, sbd_balance } = prof;
                let jsonData,
                    profile = '',
                    cover = '',
                    about = '',
                    voting_power = 0,
                    last_vote_time = '',
                    website = '';
                try {
                    jsonData = JSON.parse(prof.json_metadata) as any;
                    profile = imgUrl + '/80x80/' + jsonData.profile.profile_image;
                    cover = imgUrl + '/2048x512/' + jsonData.profile.cover_image;
                    about = jsonData.profile.about;
                    voting_power = prof.voting_power;
                    last_vote_time = prof.last_vote_time;
                    website = jsonData.profile.website;
                } catch (err) {}

                profiles[prof.name] = {
                    data: data,
                    profile: profile,
                    cover: cover,
                    about: about,
                    vp: calcVP(last_vote_time, voting_power) || '0',
                    balance: balance,
                    sbd_balance: sbd_balance,
                    website: website,
                };
            });
            return {
                ...state,
                profiles: profiles,
                isLoading: false,
            };
        case SteemProfileActionType.ERROR:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export type SteemProfileActions = SteemProfileActions;

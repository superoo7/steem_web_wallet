import { HeaderActionsType, HeaderActions } from './HeaderAction';
import { Reducer } from 'redux';

export type HeaderState = {
    readonly isHamburgerOpen: boolean;
    readonly isMobile: boolean;
};

export const headerInitialState: HeaderState = {
    isHamburgerOpen: false,
    isMobile: false,
};

export const headerReducer: Reducer<HeaderState, HeaderActions> = (state = headerInitialState, action) => {
    switch (action.type) {
        case HeaderActionsType.TOGGLE_HAMBURGER:
            return {
                ...state,
                isHamburgerOpen: !state.isHamburgerOpen,
            };
        case HeaderActionsType.UPDATE_IS_MOBILE:
            return {
                ...state,
                isMobile: action.payload.isMobile,
            };
        default:
            return state;
    }
};

export type HeaderActions = HeaderActions;

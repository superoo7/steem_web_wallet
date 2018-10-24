import { Reducer } from 'redux';
import { ConfirmActions, ConfirmActionsType } from './ConfirmAction';

export type ConfirmState = {
    readonly confirm: boolean
};

export const confirmInitialState: ConfirmState = {
    confirm: false
};

export const confirmReducer: Reducer<ConfirmState, ConfirmActions> = (state = confirmInitialState, action) => {
    switch (action.type) {
        case ConfirmActionsType.OPEN_CONFIRM:
            return {
                ...state,
                confirm: true
            };
        case ConfirmActionsType.CLOSE_CONFIRM:
            return {
                ...state,
                confirm: false
            };
        default:
            return state;
    }
};

export type ConfirmActions = ConfirmActions;

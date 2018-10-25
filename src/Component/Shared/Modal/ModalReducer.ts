import { Reducer } from 'redux';
import { ModalActions, ModalActionsType } from './ModalAction';

export type ModalState = {
    readonly confirm: boolean;
    readonly info: {
        status: boolean;
        message: string;
    };
};

export const modalInitialState: ModalState = {
    confirm: false,
    info: {
        status: false,
        message: '',
    },
};

export const modalReducer: Reducer<ModalState, ModalActions> = (state = modalInitialState, action) => {
    switch (action.type) {
        case ModalActionsType.OPEN_CONFIRM:
            return {
                ...state,
                confirm: true,
            };
        case ModalActionsType.CLOSE_CONFIRM:
            return {
                ...state,
                confirm: false,
            };
        case ModalActionsType.OPEN_INFO:
            return {
                ...state,
                info: {
                    status: true,
                    message: action.payload.message,
                },
            };
        case ModalActionsType.CLOSE_INFO:
            return {
                ...state,
                info: {
                    status: false,
                    message: '',
                },
            };
        default:
            return state;
    }
};

export type ModalActions = ModalActions;

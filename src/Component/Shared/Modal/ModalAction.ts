import { action, ActionType } from 'typesafe-actions';

export enum ModalActionsType {
    OPEN_CONFIRM = '@MODAL/open_confirm',
    CLOSE_CONFIRM = '@MODAL/close_confirm',
    OPEN_INFO = '@MODAL/open_info',
    CLOSE_INFO = '@MODAL/close_info',
}

export const openConfirm = () => action(ModalActionsType.OPEN_CONFIRM);
export const closeConfirm = () => action(ModalActionsType.CLOSE_CONFIRM);
export const openInfo = (message: string) => action(ModalActionsType.OPEN_INFO, { message: message });
export const closeInfo = () => action(ModalActionsType.CLOSE_INFO);

export type ModalActions =
    | ActionType<typeof openConfirm>
    | ActionType<typeof closeConfirm>
    | ActionType<typeof openInfo>
    | ActionType<typeof closeInfo>;

import { action, ActionType } from 'typesafe-actions';

export enum ConfirmActionsType {
    OPEN_CONFIRM = '@STYLES/open_confirm',
    CLOSE_CONFIRM = '@STYLES/close_confirm'
}

export const openConfirm = () => action(ConfirmActionsType.OPEN_CONFIRM);
export const closeConfirm = () => action(ConfirmActionsType.CLOSE_CONFIRM);

export type ConfirmActions = ActionType<typeof openConfirm> | ActionType<typeof closeConfirm>;

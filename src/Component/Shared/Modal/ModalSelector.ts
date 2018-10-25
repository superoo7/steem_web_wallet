import Types from 'Types';
import { createSelector } from 'reselect';

const getModal = (state: Types.RootState) => state.modal;

export const getIsConfirm = createSelector(getModal, modal => modal.confirm);
export const getIsInfo = createSelector(getModal, modal => modal.info.status);
export const getInfoMessage = createSelector(getModal, modal => modal.info.message);

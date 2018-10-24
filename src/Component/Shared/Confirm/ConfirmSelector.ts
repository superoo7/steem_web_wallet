import Types from 'Types';
import { createSelector } from 'reselect';

export const getConfirm = (state: Types.RootState) => state.confirm;

export const getIsConfirm = createSelector(getConfirm, confirm => confirm.confirm);

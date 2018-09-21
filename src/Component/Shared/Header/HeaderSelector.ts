/// <reference path="../../../types.d.ts" />
import Types from 'Types';
import { createSelector } from 'reselect';

export const getHeader = (state: Types.RootState) => state.header;

export const getIsHamburgerOpen = createSelector(getHeader, header => header.isHamburgerOpen);
export const getIsMobile = createSelector(getHeader, header => header.isMobile);

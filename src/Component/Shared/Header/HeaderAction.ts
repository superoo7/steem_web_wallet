import { action, ActionType } from 'typesafe-actions';

export enum HeaderActionsType {
    TOGGLE_HAMBURGER = '@STYLES/hamburger',
    UPDATE_IS_MOBILE = '@STYLES/is_mobile',
}

export const toggleHamburger = () => action(HeaderActionsType.TOGGLE_HAMBURGER);
export const updateIsMobile = (isMobile: boolean) => action(HeaderActionsType.UPDATE_IS_MOBILE, { isMobile: isMobile });

export type HeaderActions = ActionType<typeof toggleHamburger> | ActionType<typeof updateIsMobile>;

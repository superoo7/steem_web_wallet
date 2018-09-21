import { StateType } from 'typesafe-actions';
import { rootReducer } from './store';
import { HeaderActions } from 'Component/Shared/Header/HeaderReducer';
import { SignInActions } from 'Component/Shared/SignIn/SignInAction';
import { SteemProfileActions } from 'Component/Shared/SignIn/Wallet/SteemProfileReducer';

declare module 'Types' {
    export type RootState = StateType<typeof rootReducer>;
    export type RootAction = HeaderActions & SignInActions & SteemProfileActions;
}

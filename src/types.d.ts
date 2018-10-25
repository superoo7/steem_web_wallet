import { StateType } from 'typesafe-actions';
import { rootReducer } from './store';
import { HeaderActions } from 'Component/Shared/Header/HeaderReducer';
import { SignInActions } from 'Component/Shared/SignIn/SignInReducer';
import { SteemProfileActions } from 'Component/Shared/SignIn/Wallet/SteemProfileReducer';
import { ToastrActionCreators } from 'react-redux-toastr';
import { ModalActions } from 'Component/Shared/Modal/ModalReducer';
import { SettingsActions } from 'Component/Settings/SettingsReducer';

declare module 'Types' {
    export type RootState = StateType<typeof rootReducer>;
    export type RootAction = HeaderActions & SignInActions & SteemProfileActions & ModalActions & SettingsActions; //& ToastrActionCreators;
}

// {
//     const _a: any;
//     export = _a;
// }

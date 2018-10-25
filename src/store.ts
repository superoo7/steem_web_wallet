import { createStore, applyMiddleware, compose } from 'redux';
import { signInFresh } from 'Component/Shared/SignIn/SignInAction';

// Epics
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { signInEpic, signInFreshEpic, signOutEpic } from 'Component/Shared/SignIn/SignInEpic';
import { getSteemProfileEpic } from 'Component/Shared/SignIn/Wallet/SteemProfileEpic';
import { setApiEpic, apiInitEpic } from 'Component/Settings/SettingsEpic';

const Epics: Epic<any> = combineEpics(signInEpic, signInFreshEpic, signOutEpic, getSteemProfileEpic, setApiEpic, apiInitEpic);
const epicMiddleware = createEpicMiddleware();

// Combine Reducers
import { combineReducers } from 'redux';
import { headerReducer, HeaderState, HeaderActions, headerInitialState } from 'Component/Shared/Header/HeaderReducer';
import { signInInitialState, signInReducer, SignInState, SignInActions } from 'Component/Shared/SignIn/SignInReducer';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';
import { modalReducer, ModalState, ModalActions, modalInitialState } from 'Component/Shared/Modal/ModalReducer';
import { SettingsState, settingsInitialState, settingsReducer, SettingsActions } from 'Component/Settings/SettingsReducer';
import {
    steemProfileReducer,
    SteemProfileState,
    steemProfileInitialState,
    SteemProfileActions,
} from 'Component/Shared/SignIn/Wallet/SteemProfileReducer';
import { apiInit } from 'Component/Settings/SettingsAction';

interface reducerState {
    header: HeaderState;
    signIn: SignInState;
    profiles: SteemProfileState;
    toastr: ToastrState;
    modal: ModalState;
    settings: SettingsState;
}
type reducerAction = HeaderActions & SignInActions & SteemProfileActions & ModalActions & SettingsActions;
const initialState = {
    header: headerInitialState,
    signIn: signInInitialState,
    profiles: steemProfileInitialState,
    modal: modalInitialState,
    settings: settingsInitialState,
};
export const rootReducer = combineReducers<reducerState, reducerAction>({
    header: headerReducer,
    signIn: signInReducer,
    profiles: steemProfileReducer,
    toastr: toastrReducer,
    modal: modalReducer,
    settings: settingsReducer,
});

// Combine Epics

// Redux Dev Tools
const composeEnhancers = (process.env.NODE_ENV !== 'production' && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// create store
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

// start epic
epicMiddleware.run(Epics);

// Initialize action
store.dispatch(signInFresh());
store.dispatch(apiInit());

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import { signInFresh } from 'Component/Shared/SignIn/SignInAction';

// Epics
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { signInEpic, signInFreshEpic } from 'Component/Shared/SignIn/SignInEpic';
import { getSteemProfileEpic } from 'Component/Shared/SignIn/Wallet/SteemProfileEpic';

const Epics: Epic<any> = combineEpics(signInEpic, signInFreshEpic, getSteemProfileEpic);
const epicMiddleware = createEpicMiddleware();

// Combine Reducers
import { combineReducers } from 'redux';
import { headerReducer, HeaderState, HeaderActions, headerInitialState } from 'Component/Shared/Header/HeaderReducer';
import { signInInitialState, signInReducer, SignInState, SignInActions } from 'Component/Shared/SignIn/SignInReducer';
import {
    steemProfileReducer,
    SteemProfileState,
    steemProfileInitialState,
    SteemProfileActions,
} from 'Component/Shared/SignIn/Wallet/SteemProfileReducer';

interface reducerState {
    header: HeaderState;
    signIn: SignInState;
    profiles: SteemProfileState;
}
type reducerAction = HeaderActions & SignInActions & SteemProfileActions;
const initialState = {
    header: headerInitialState,
    signIn: signInInitialState,
    profiles: steemProfileInitialState,
};
export const rootReducer = combineReducers<reducerState, reducerAction>({
    header: headerReducer,
    signIn: signInReducer,
    profiles: steemProfileReducer,
});

// Combine Epics

// Redux Dev Tools
const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create store
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

// start epic
epicMiddleware.run(Epics);

store.dispatch(signInFresh());

export default store;

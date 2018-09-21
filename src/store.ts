import { createStore, applyMiddleware, compose, ReducersMapObject } from 'redux';

// Epics
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { signInEpic, signInFreshEpic } from 'Component/Shared/SignIn/SignInEpic';

const Epics: Epic<any> = combineEpics(signInEpic, signInFreshEpic);
const epicMiddleware = createEpicMiddleware();

// Combine Reducers
import { combineReducers } from 'redux';
import { headerReducer, HeaderState, HeaderActions, headerInitialState } from 'Component/Shared/Header/HeaderReducer';
import { signInInitialState, signInReducer, SignInState, SignInActions } from 'Component/Shared/SignIn/SignInReducer';
import { signInFresh } from 'Component/Shared/SignIn/SignInAction';

interface reducerState {
    header: HeaderState;
    signIn: SignInState;
}
type reducerAction = HeaderActions & SignInActions;
const initialState = {
    header: headerInitialState,
    signIn: signInInitialState,
};
export const rootReducer = combineReducers<reducerState, reducerAction>({
    header: headerReducer,
    signIn: signInReducer,
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

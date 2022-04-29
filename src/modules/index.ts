import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import interestReducer from './interests';
import searchReducer from './search';
import reducer from './reducer';
export const store = configureStore({
    reducer: {
        user: userReducer,
        interest: interestReducer,
        searchList: searchReducer,
        chatReducer: reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
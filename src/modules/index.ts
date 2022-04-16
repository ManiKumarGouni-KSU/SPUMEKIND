import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import interestReducer from './interests';
import searchReducer from './search';

export const store = configureStore({
    reducer: {
        user: userReducer,
        interest: interestReducer,
        searchList: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/sliceContacts";
import { filterReducer } from "./sliceFilter";
import { authReducer } from "./auth/authSlice";

import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
}

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filter: filterReducer,
        auth: persistReducer(authPersistConfig, authReducer),
    },
    
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistedStore = persistStore(store);


import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    PersistConfig,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist'
import { taskSlice } from './slices/taskSlice'
import { userSlice } from './slices/userSlice'
import { api } from '../api/api'
import { scheduleSlice } from './slices/scheduleSlice'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['api'],
}
export const revertAll = createAction('REVERT_ALL')

const reducers = combineReducers({
    api: api.reducer,
    [userSlice.name]: userSlice.reducer,
    [taskSlice.name]: taskSlice.reducer,
    [scheduleSlice.name]: scheduleSlice.reducer,
})

const RootReducer = (state: any, action: any) => {
    if (action.type === revertAll?.type) {
        state = undefined
    }

    return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(api.middleware),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

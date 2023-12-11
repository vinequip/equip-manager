import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  authSlice  from './redux/slice/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export const store = configureStore({
  reducer: combineReducers (
    {
      auth: persistReducer(
        {
          key: 'auth',
          storage
        },
        authSlice
        )
    },
  )
})


export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
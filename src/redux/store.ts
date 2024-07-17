import { configureStore } from '@reduxjs/toolkit'
import header from './slices/header'
import config from './slices/config'
import auth from './slices/auth/auth'
import examSlice from './slices/exam/examSlice'
// ...

export const store = configureStore({
  reducer: {
    header: header,
    config: config,
    auth: auth,
    exam: examSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
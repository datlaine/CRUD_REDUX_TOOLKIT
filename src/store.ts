import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'Components/Reducer/blog.reducer'

export const store = configureStore({
  reducer: { blog: blogReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

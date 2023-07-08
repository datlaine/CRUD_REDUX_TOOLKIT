import { createAction, createReducer } from '@reduxjs/toolkit'
import { initialPost } from 'Components/constant/blog'
import IPost from 'Components/types/blog.type'

interface BlogState {
  postList: IPost[]
  startEditing: IPost | null
  focus: boolean
}

const initialState: BlogState = {
  postList: initialPost,
  startEditing: null,
  focus: false,
}

export const addBlog = createAction<IPost>('blog/addPost')
export const deleteBlog = createAction<string>('blog/deletePost')
export const startEditingBlog = createAction<string>('blog/startEditingBlog')
export const cancelEdit = createAction('blog/cancelEdit')
export const finishEdit = createAction<IPost>('blog/editPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBlog, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deleteBlog, (state, action) => {
      const postId = action.payload
      const foundId = state.postList.findIndex((post) => post.id === postId)
      if (foundId !== -1) {
        state.postList.splice(foundId, 1)
      }
    })
    .addCase(startEditingBlog, (state, action) => {
      const foundId = state.postList.find((post) => post.id === action.payload) || null
      state.startEditing = foundId
      state.focus = true
    })
    .addCase(cancelEdit, (state) => {
      state.startEditing = null
    })
    .addCase(finishEdit, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.startEditing = null
    })
})

export default blogReducer

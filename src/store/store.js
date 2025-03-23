import { configureStore } from "@reduxjs/toolkit";
import likeReducer from './likeSlice'

const store = configureStore({
  reducer :{
    likes: likeReducer
  }
})

export default store
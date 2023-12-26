import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: null,
    },
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        changePost: (state, action) => {
            state.posts = state.posts.map(item => {
                if (item._id === action.payload._id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(item => item._id !== action.payload);
        }
    }
});

export const { getPosts, addPost, changePost, deletePost } = postSlice.actions;
export default postSlice.reducer;

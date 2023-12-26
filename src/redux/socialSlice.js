import { createSlice } from "@reduxjs/toolkit";

const socialSlice = createSlice({
    name: "social",
    initialState: {
        socials: null,
    },
    reducers: {
        getSocials: (state, action) => {
            state.socials = action.payload;
        },
        addSocial: (state, action) => {
            state.socials.unshift(action.payload);
        },
        changeSocial: (state, action) => {
            state.socials = state.socials.map(item => {
                if(item._id === action.payload._id){
                    return action.payload;
                }else{
                    return item;
                }
            })
        },
        deleteSocial: (state, action) => {
            state.socials = state.socials.filter(item => item._id !== action.payload);
        }
    }
})



export const { getSocials, addSocial, changeSocial, deleteSocial } = socialSlice.actions
export default socialSlice.reducer
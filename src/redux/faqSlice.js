import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
    name: "faq",
    initialState: {
        faqs: null,
    },
    reducers: {
        getFaqs: (state, action) => {
            state.faqs = action.payload;
        },
        addFaq: (state, action) => {
            state.faqs.unshift(action.payload);
        },
        changeFaq: (state, action) => {
            state.faqs = state.faqs.map(item => {
                if(item._id === action.payload._id){
                    return action.payload;
                }else{
                    return item;
                }
            })
        },
        deleteFaq: (state, action) => {
            state.faqs = state.faqs.filter(item => item._id !== action.payload);
        }
    }
})



export const { getFaqs, addFaq, changeFaq, deleteFaq } = faqSlice.actions
export default faqSlice.reducer
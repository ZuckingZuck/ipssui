import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        services: null,
    },
    reducers: {
        getServices: (state, action) => {
            state.services = action.payload;
        },
        addService: (state, action) => {
            state.services.unshift(action.payload);
        },
        changeService: (state, action) => {
            state.services = state.services.map(item => {
                if(item._id === action.payload._id){
                    return action.payload;
                }else{
                    return item;
                }
            })
        },
        deleteService: (state, action) => {
            state.services = state.services.filter(item => item._id !== action.payload);
        }
    }
})



export const { getServices, addService, changeService, deleteService } = serviceSlice.actions
export default serviceSlice.reducer
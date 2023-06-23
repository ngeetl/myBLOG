import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false
}

if(localStorage.getItem('isLogin')) {
    initialState.isLogin = true;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            localStorage.setItem('isLogin', 'true');
        },
        logout: (state, action) => {
            state.isLogin = false;
            localStorage.removeItem('isLogin');
        }
    }
}) 

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
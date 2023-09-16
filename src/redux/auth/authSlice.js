import { createSlice } from "@reduxjs/toolkit"
import { registerUser, loginUser, logOutUser, refreshUser } from "./operations"

const initialState = {
    userData: null,
    token: null,
    isLoading: false,
    authenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder =>
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = action.payload.token;
                state.userData = action.payload.user;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authenticated = true;
                state.token = action.payload.token;
                state.userData = action.payload.user;
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authenticated = false;
                state.userData = null;
                state.token = null;

            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authenticated = true;
                state.userData = action.payload;
            })
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            ),
});

export const authReducer = authSlice.reducer;
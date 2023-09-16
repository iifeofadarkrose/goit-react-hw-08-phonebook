import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import iziToast from "izitoast";
import "/node_modules/izitoast/dist/css/iziToast.css";

export const instance = axios.create({
    baseURL: 'https://connections-api.herokuapp.com/',
});

export const token = {
    set: token => {
        instance.defaults.headers['Authorization'] = token;
    },
    clear: () => {
        instance.defaults.headers['Authorization'] = '';
    },
};

export const registerUser = createAsyncThunk('auth/registerUser',
    async (dataUser, thunkApi) => {
        try {
            const { data } = await instance.post(`users/signup`, dataUser);
            token.set(data.token);



            return data;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrong.... ${error.message}`,
            });
            return thunkApi.rejectWithValue(error.message);
        }
    });

export const loginUser = createAsyncThunk('auth/lginUser',
    async (dataUser, thunkApi) => {
        try {
            const { data } = await instance.post(`users/login`, dataUser);
            token.set(data.token);
            return data;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrong.... ${error.message}`,
            });
            return thunkApi.rejectWithValue(error.message);
        }
    });

export const logOutUser = createAsyncThunk('auth/logOutUser',
    async (_, thunkApi) => {
        try {
            await instance.post(`users/logout`);
            token.clear();
            return;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrong.... ${error.message}`,
            });
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk('auth/refreshUser',
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const userToken = state.auth.token;
            token.set(userToken);
            const { data } = await instance.get(`users/current`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, { getState }) => {
            const state = getState();
            const token = state.auth.token;
            if (!token) {
                return false;
            }
        },
    }
);
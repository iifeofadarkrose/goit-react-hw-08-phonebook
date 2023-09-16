import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "redux/auth/operations";
import iziToast from "izitoast";
import "/node_modules/izitoast/dist/css/iziToast.css";

export const fetchContacts = createAsyncThunk('contacts/fetchall',
    async (_, thunkAPI) => {
        try {
            const resp = await instance.get('/contacts');

            return resp.data;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrog.... ${error.message}`,
            });
            return thunkAPI.rejectWithValue(error.message);
        }
    })

export const fetchAddContact = createAsyncThunk('contacs/addContact',
    async (contact, thunkAPI) => {
        try {
            const resp = await instance.post('/contacts', contact);

            iziToast.success({
                title: 'Success!',
                message: 'The contact was successfully added!',
            });
            return resp.data;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrog.... ${error.message}`,
            });
            return thunkAPI.rejectWithValue(error.message);
        }
    })

export const fetchDeleteContact = createAsyncThunk('contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const resp = await instance.delete(`contacts/${contactId}`);
            iziToast.warning({
                title: 'Delete',
                message: 'The contact was successfully deleted!',
            });
            return resp.data;
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: `Oops! Something was wrog.... ${error.message}`,
            });
            return thunkAPI.rejectWithValue(error.message);
        }
    })
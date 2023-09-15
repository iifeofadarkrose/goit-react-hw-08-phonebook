import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, fetchDeleteContact, fetchAddContact } from './apiOperations';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
                state.error = null;
            })

            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchDeleteContact.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchDeleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
                state.error = null;
            })

            .addCase(fetchDeleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchAddContact.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchAddContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts.unshift(action.payload);
                state.error = null;
            })
            
            .addCase(fetchAddContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
});

export const { formAddContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
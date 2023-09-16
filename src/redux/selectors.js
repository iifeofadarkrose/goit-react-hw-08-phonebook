import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.contacts;

export const selectFilterList = state => state.filter.filter;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectFilterList, selectContacts],
    (filterList, contacts) => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(filterList.toLowerCase()));
    }
);

export const selectUserAuthenticated = state => state.auth.authenticated;
export const selectUserData = state => state.auth.userData;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectUserToken = state => state.auth.token;
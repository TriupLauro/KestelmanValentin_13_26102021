import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : 'login',
    initialState : {
        status : 'disconnected',
        error : null,
        userData : null
    },
    reducers: {
        logout : state => {
            document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
            state.status = 'disconnected'
            state.error = null
            state.userData = null
        },
        connecting : (state) => {
            state.status = 'connecting'
            state.error = null
        },
        rejected : (state,action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        connected : (state) => {
            state.status = 'connected'
            state.error = null
        },
        resolved : (state, action) => {
            state.userData = action.payload
            state.status = 'resolved'
            state.error = null
        },
        renaming : (state, action) => {
            state.userData.firstName = action.payload.firstName
            state.userData.lastName = action.payload.lastName
            state.status = 'renaming'
            state.error = null
        },
        renamed : (state) => {
            state.status = 'renamed'
            state.error = null
        }
    }
})

export const { logout, connecting, rejected, connected, resolved, renaming, renamed } = loginSlice.actions

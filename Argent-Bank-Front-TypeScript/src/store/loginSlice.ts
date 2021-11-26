import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface userData {
    email? : string
    firstName? : string
    lastName? : string
    createdAt? : string
    updateAt? : string
    id? : string
}

interface loginState {
    status : string
    error : string | null
    userData : userData | null
}

export interface userName {
    firstName : string
    lastName : string
}

const loginInitialState : loginState = {
    status : 'disconnected',
    error : null,
    userData : null
}

export const loginSlice = createSlice({
    name: 'login',
    initialState : loginInitialState,
    reducers: {
        connecting : state => {
            state.status = 'connecting'
        },
        authentified : state => {
            state.status = 'authentified'
        },
        retrieved : (state, action : PayloadAction<userData>) => {
            state.status = 'retrieved'
            state.userData = action.payload
            state.error = null
        },
        rejected : (state, action : PayloadAction<string>) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        renaming : (state, action : PayloadAction<userName> ) => {
            if (state.userData) {
                state.status = 'renaming'
                state.userData.firstName = action.payload.firstName
                state.userData.lastName = action.payload.lastName
            }else{
                //The below code shouldn't run
                state.status = 'rejected'
                state.error = 'Error while trying to rename'
            }
        },
        renamed : (state) => {
            state.status = 'renamed'
            state.error = null
        },
        disconnect : (state) => {
            document.cookie = `token=; expires=Thu, 01 Jan 1970; samesite=strict`
            state.status = 'disconnected'
            state.error = null
            state.userData = null
        }
    }
})

export const {connecting, authentified, retrieved, rejected, renaming, renamed, disconnect} = loginSlice.actions


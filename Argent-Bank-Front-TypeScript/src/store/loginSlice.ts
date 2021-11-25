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
        },
        rejected : (state, action : PayloadAction<string>) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export const {connecting, authentified, retrieved, rejected} = loginSlice.actions


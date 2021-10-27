import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : 'login',
    initialState : {
        status : 'disconnected',
        token : null,
        error : null
    },
    reducers: {
        logout : state => {
            state.token = null
            state.status = 'disconnected'
            state.error = null
        },
        connecting : (state) => {
            if (state.status === 'connecting') return
            state.status = 'connecting'
            state.error = null
        },
        rejected : (state,action) => {
            state.status = 'rejected'
            state.token = null
            state.error = action.payload
        },
        connected : (state, action) => {
            state.token = action.payload
            state.status = 'connected'
            state.error = null
        }
    }
})

export const { logout, connecting, rejected, connected } = loginSlice.actions

export default loginSlice.reducer
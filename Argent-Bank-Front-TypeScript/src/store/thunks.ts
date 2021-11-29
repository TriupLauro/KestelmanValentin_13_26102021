import axios from "axios";
import {BASE_URL} from "../constants/constants";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./store";
import {authentified, connecting, rejected, renamed, renaming, retrieved, userName} from "./loginSlice";
import {generateConfig} from "../utils/utils";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export function authentification({userName, password} : {userName : string, password : string}) : AppThunk {
    return async (dispatch) => {
        dispatch(connecting())

        let response

        try {
            response = await axios.post(`${BASE_URL}/user/login`, {
                email : userName,
                password : password
            })
        }catch(error : any){
            dispatch(rejected(error.response.data.message))
            return
        }
        console.log(response.data.message)

        dispatch(authentified())
        document.cookie = `token=${response.data.body.token}; samesite=strict; max-age=${60*60*24}`
    }
}

export async function retrieveUserData(dispatch : AppDispatch) : Promise<void>{
    let response
    const config = generateConfig()

    try {
        response = await axios.post(`${BASE_URL}/user/profile`, {},config)
    }catch(error : any){
        dispatch(rejected(error.response.data.message))
        return
    }
    dispatch(retrieved(response.data.body))
}

export function updateUserName({firstName, lastName} : userName) : AppThunk {
    return async (dispatch) => {
        dispatch(renaming({firstName, lastName}))
        const config = generateConfig()
        let response

        try {
            response = await axios.put('http://localhost:3001/api/v1/user/profile',{
                firstName,
                lastName
            }, config)
        }catch(error : any){
            dispatch(rejected(error.response.data.message))
            return
        }
        console.log(response.data.message)
        dispatch(renamed())
    }
}


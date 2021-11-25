import axios from "axios";
import {BASE_URL} from "../constants/constants";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {authentified, rejected} from "./loginSlice";

export function authentification({userName, password} : {userName : string, password : string}) : ThunkAction<void, RootState, unknown, AnyAction> {
    return async (dispatch) => {
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
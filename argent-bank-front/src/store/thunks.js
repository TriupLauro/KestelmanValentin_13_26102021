import {connected, connecting, rejected, renamed, renaming, resolved} from "./loginSlice";
import axios from "axios";
import {generateConfig} from "../utils/utils";
import * as loginActions from "./loginSlice";
import {BASE_URL} from "../constants";

export function postCredentials({username, password}) {
    return async (dispatch) => {
        dispatch(connecting())
        let response

        try {
            response = await axios.post(`${BASE_URL}/user/login`, {
                email : username,
                password : password
            })
        } catch(error) {
            dispatch(rejected(error.response.data.message))
            return
        }
        document.cookie = `abtoken=${response.data.body.token}; max-age=${60*60*24}; samesite=strict`
        dispatch(connected())
    }
}

export async function retrieveUserData(dispatch) {
    let response
    const config = generateConfig()

    try {
        response = await axios.post(`${BASE_URL}/user/profile`, {},config)
    }catch(error){
        dispatch(rejected(error.response.data.message))
        document.cookie = `abtoken=; expires=Thu, 01 Jan 1970; samesite=strict`
        return
    }
    dispatch(resolved(response.data.body))
}

export function updateUserName({firstName, lastName}) {
    return async (dispatch,getState) => {
        dispatch(renaming({firstName, lastName}))
        const config = generateConfig()
        let response

        try {
            response = await axios.put(`${BASE_URL}/user/profile`,{
                firstName : getState().login.userData.firstName,
                lastName : getState().login.userData.lastName
            }, config)
        }catch(error){
            dispatch(loginActions.rejected(error.response.data.message))
            return
        }
        console.log(response.data.message)
        dispatch(renamed())
    }
}
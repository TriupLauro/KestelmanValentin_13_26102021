import {useEffect, useState} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";
import {connected} from "../store/loginSlice";
import axios from "axios";
import * as loginActions from "../store/loginSlice";

//Check if the token is in the cookies
//Login if that's the case
//Redirect if trying to access user pages without being logged in
//Redirect to the sign-in page
export function useLoginCheck() {
    const [redirect, setRedirect] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const store = useStore()
    const config = generateConfig()

    const status = useSelector(state => state.login.status)

    useEffect(() => {
        if (status === 'renaming') {
            axios.put('http://localhost:3001/api/v1/user/profile',{
                    firstName : store.getState().login.userData.firstName,
                    lastName : store.getState().login.userData.lastName
                }, config
            ).then(response => {
                console.log(response.data.message)
                dispatch(loginActions.renamed())
            }).catch(error => {
                dispatch(loginActions.rejected(error.response.data))
                setRedirect('/sign-in')
                throw error
            })
        }

        if (config) {
            if (status === 'resolved' || status === 'renamed' || status === 'renaming') {
                setLoading(false)
                return {redirect, loading, userData}
            }
            if (status !== 'connected') dispatch(connected())
        }else{
            setLoading(false)
            setRedirect('/sign-in')
        }

        if (status === 'connected') {
            axios.post('http://localhost:3001/api/v1/user/profile', {},config
            ).then(response => {
                dispatch(loginActions.resolved(response.data.body))
                setLoading(false)
            }).catch(error => {
                dispatch(loginActions.rejected(error.response.data))
                setRedirect('/sign-in')
                throw error
            })
        }
    }, [status])

    const userData = store.getState().login.userData

    //Useful only for pages that use userData
    return {redirect, loading, userData}
}

export function getTokenFromCookie() {
    if (document.cookie.split(';').find(row => row.startsWith('token='))) {
        return document.cookie
            .split(';').find(row => row.startsWith('token=')).split('=')[1]
    }else{
        console.log('Cannot read token cookie')
        return null
    }
}

export function generateConfig() {
    const token = getTokenFromCookie()
    if (!token) return null

    return {
        headers : {Authorization : `Bearer ${token}`}
    }
}

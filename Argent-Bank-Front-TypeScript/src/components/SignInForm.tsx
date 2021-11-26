import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {authentification} from "../store/thunks";
import {useAppDispatch, useAppSelector} from "../store/storeHooks";
import {useNavigate} from "react-router-dom"

function SignInForm() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [displayError, setDisplayError] = useState(false)
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.login.status)
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'authentified') navigate("/user")
        if (status === 'rejected') setDisplayError(true)
    }, [status])

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(authentification({
            userName,
            password
        }))
    }

    function onUserNameChange(e : ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value)
    }

    function onPasswordChange(e : ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={userName} onChange={onUserNameChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange}/>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me"/><label htmlFor="remember-me">Remember me</label>
            </div>
            {displayError && <div>Could not login</div>}
            <button className="sign-in-button">Sign In</button>
        </form>
    )
}

export default SignInForm
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {authentification} from "../store/thunks";

function SignInForm() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

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
            <button className="sign-in-button">Sign In</button>
        </form>
    )
}

export default SignInForm
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postCredentials} from "../store/thunks";
import React from "react";

function SignInForm() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogins, setInvalidLogins] = useState(false)
    const dispatch = useDispatch()

    const status = useSelector(state => state.login.status)
    const history = useHistory()

    useEffect(() => {
        if (status === 'rejected') setInvalidLogins(true)
        if (status === 'connected') history.push('/user')
    }, [status])

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postCredentials({username,password}))
    }

    function typeUsername(e) {
        setUserName(e.target.value)
    }

    function typePassword(e) {
        setPassword(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={typeUsername}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={typePassword}/>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {invalidLogins && <div>Could not login with those credentials</div>}
            <button className="sign-in-button" type="submit">Sign In</button>
        </form>
    )
}

export default SignInForm
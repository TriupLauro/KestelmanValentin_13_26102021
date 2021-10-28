import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import * as loginActions from "../store/loginSlice"

function SignInForm() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogins, setInvalidLogins] = useState(false)
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(loginActions.connecting())
        axios.post('http://localhost:3001/api/v1/user/login', {
            email : userName,
            password : password
        }).then(response => {
            setInvalidLogins(false)
            console.log(response)
            dispatch(loginActions.connected(response.data.body.token))
        }).catch(error => {
            if (error.response.status === 400) setInvalidLogins(true)
            dispatch(loginActions.rejected(error.response.data))
            throw error
        })
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
                <input type="text" id="username" value={userName} onChange={typeUsername}/>
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
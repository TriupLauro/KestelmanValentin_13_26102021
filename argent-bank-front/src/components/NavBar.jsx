import argentBankLogo from '../img/argentBankLogo.png'
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as loginActions from "../store/loginSlice"
import axios from "axios";
import {useStore} from "react-redux";
import {useEffect, useState} from "react";

function NavBar() {
    const store = useStore()
    const dispatch = useDispatch()
    const status = useSelector(state => state.login.status)
    const [redirect,setRedirect] = useState(null)

    useEffect(() => {
        const token = store.getState().login.token
        const config = {
            headers : {Authorization : `Bearer ${token}`}
        }

        if (status === 'connected') {
            axios.post('http://localhost:3001/api/v1/user/profile', {},config
            ).then(response => {
                dispatch(loginActions.resolved(response.data.body))
                setRedirect('/user')
            }).catch(error => {
                dispatch(loginActions.rejected(error.response.data))
                throw error
            })
        }

        if (status === 'renaming') {
            axios.put('http://localhost:3001/api/v1/user/profile',{
                firstName : store.getState().login.userData.firstName,
                lastName : store.getState().login.userData.lastName
            }, config
            ).then(response => {
                console.log(response)
                dispatch(loginActions.renamed())
            }).catch(error => {
                dispatch(loginActions.rejected(error.response.data))
                throw error
            })
        }

    },[status])

    if (redirect) return <Redirect to={redirect}/>

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {store.getState().login.userData ?
                    <>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            {store.getState().login.userData.firstName}
                        </Link>
                        <Link className="main-nav-item" onClick={() => dispatch(loginActions.logout())} to="/">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                    :
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                }
            </div>
        </nav>
    )
}

export default NavBar
import argentBankLogo from '../img/argentBankLogo.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as loginActions from "../store/loginSlice"
import axios from "axios";
import {useStore} from "react-redux";
import {useEffect} from "react";

function NavBar() {
    const store = useStore()
    const dispatch = useDispatch()
    const status = useSelector(state => state.login.status)

    useEffect(() => {
        if (status === 'connected') {
            const token = store.getState().login.token
            const config = {
                headers : {Authorization : `Bearer ${token}`}
            }
            axios.post('http://localhost:3001/api/v1/user/profile', {},config
            ).then(response => {
                dispatch(loginActions.resolved(response.data.body))
            }).catch(error => {
                dispatch(loginActions.rejected(error.response.data))
                throw error
            })
        }
    },[status])

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
                        <Link className="main-nav-item" to="#">
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
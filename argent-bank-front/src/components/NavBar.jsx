import argentBankLogo from '../img/argentBankLogo.png'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as loginActions from "../store/loginSlice"
import {useStore} from "react-redux";
import React from "react";

function NavBar() {
    const store = useStore()
    const dispatch = useDispatch()

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
                {store.getState().login?.userData ?
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
import React from "react";
import ArgentBankLogo from "../assets/argentBankLogo.png"
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/storeHooks";
import {disconnect} from "../store/loginSlice";

function NavBar() {
    const userName = useAppSelector(state => state.login.userData?.firstName)
    const dispatch = useAppDispatch()

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {userName ?
                    <>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"> </i>
                            {userName}
                        </Link>
                        <Link className="main-nav-item" onClick={() => dispatch(disconnect())} to="/">
                            <i className="fa fa-sign-out"> </i>
                            Sign Out
                        </Link>
                    </>
                    :
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"> </i>
                        Sign In
                    </Link>
                }
            </div>
        </nav>
    )
}

export default NavBar
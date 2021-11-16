import {Redirect} from "react-router-dom";
import {useState} from "react";
import React from "react";
import PropTypes from "prop-types";

function UserAccount({title, amount}) {

    const [redirect,setRedirect] = useState(null)

    if (redirect) return <Redirect to={redirect}/>

    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">${amount.toLocaleString('en',{minimumFractionDigits : 2})}</p>
                <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button
                    className="transaction-button"
                    onClick={() => setRedirect('/transactions')}
                >View transactions</button>
            </div>
        </section>
    )
}

UserAccount.propTypes = {
    title : PropTypes.string.isRequired,
    amount : PropTypes.number.isRequired
}

export default UserAccount
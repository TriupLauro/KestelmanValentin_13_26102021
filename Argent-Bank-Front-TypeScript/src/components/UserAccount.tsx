

function UserAccount({title, amount} : {title : string, amount : number}) {

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
                    //onClick={() => setRedirect('/transactions')}
                >View transactions</button>
            </div>
        </section>
    )
}

export default UserAccount
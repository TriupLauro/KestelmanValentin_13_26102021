import MainLayout from "../layouts/MainLayout";
import "../styles/transaction.css"

function TransactionsDetails() {
    return (
        <MainLayout>
            <main className="bg-dark main">
                <header className="transaction-main-container">
                    <div className="transaction-account-title">Argent Bank Checkin (x8349)</div>
                    <div className="transaction-account-balance">$2,082.79</div>
                    <div className="transaction-account-subtitle">Available Balance</div>
                </header>

                <table className="transaction-frame">
                    <thead className="transaction-frame-head">
                        <tr>
                            <th> </th>
                            <th className="transaction-frame-head-date">Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody className="transaction-frame-body">
                        <tr className="transaction-frame-row">
                            <td className="transaction-frame-chevron-container">
                                <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                            </td>
                            <td>
                                <div className="transaction-frame-date">June 20th, 2020</div>
                            </td>
                            <td>Golden Sun Bakery</td>
                            <td>$5.00</td>
                            <td>$2,082.79</td>
                        </tr>
                        <tr className="transaction-frame-row dropdown-open">
                            <td className="transaction-frame-chevron-container">
                                <i className="fa fa-chevron-up" aria-hidden="true"> </i>
                            </td>
                            <td>
                                <div className="transaction-frame-date">June 20th, 2020</div>
                            </td>
                            <td>Golden Sun Bakery</td>
                            <td>$10.00</td>
                            <td>$2,087.79</td>
                        </tr>
                        <tr >
                            <td className="transaction-frame-space"> </td>
                            <td className="transaction-frame-dropdown-content" colSpan={4}>
                                <div className="transaction-frame-dropdown-line">Transaction Type: Electronic</div>
                                <div className="transaction-frame-dropdown-line">Category: Food <i className="fa fa-pencil"> </i></div>
                                <div className="transaction-frame-dropdown-line">Notes: <i className="fa fa-pencil"> </i></div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </main>
        </MainLayout>
    )
}

export default TransactionsDetails
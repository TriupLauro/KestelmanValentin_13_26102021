import MainLayout from "../layouts/MainLayout";
import "../styles/transaction.css"
import TransactionFrameRow from "../components/TransactionFrameRow";
import {useLoginCheck} from "../utils/utils";
import {Redirect} from "react-router-dom";

//The data used here is only a placeholder and will contain the same data no matter the account clicked

function TransactionsDetails() {
    const {loading, redirect} = useLoginCheck()

    if (loading) return <div>Loading data</div>

    if (redirect) return <Redirect to={redirect} />

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
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={5}
                        balance={2082.79}
                    />
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={10.00}
                        balance={2087.79}
                    />
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={20}
                        balance={2097.79}
                    />
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={30}
                        balance={2117.79}
                    />
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={40}
                        balance={2147.79}
                    />
                    <TransactionFrameRow
                        notes=""
                        category="Food"
                        description="Golden Sun Bakery"
                        date="June 20th, 2020"
                        amount={50}
                        balance={2187.79}
                    />
                    </tbody>

                </table>
            </main>
        </MainLayout>
    )
}

export default TransactionsDetails
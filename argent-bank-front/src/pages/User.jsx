import UserAccount from "../components/UserAccount";
import MainLayout from "../layouts/MainLayout";
import {Redirect} from "react-router-dom";
import {useLoginCheck} from "../utils/utils";

//The UserAccount component uses placeholder data here

function User() {
    const {loading, redirect, userData} = useLoginCheck()

    if (loading) return <div>Loading data</div>

    if (redirect) return <Redirect to={redirect} />

    if (userData) {
        return (
            <MainLayout>
                <main className="main bg-dark">
                    <div className="header">
                        <h1>Welcome back<br/>{userData.firstName} {userData.lastName}!</h1>
                        <button className="edit-button">Edit Name</button>
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <UserAccount title="Argent Bank Checking (x8349)" amount={2082.79} />
                    <UserAccount title="Argent Bank Savings (x6712)" amount={10928.42} />
                    <UserAccount title="Argent Bank Credit Card (x8349)" amount={184.30} />
                </main>
            </MainLayout>
        )
    }
}

export default User
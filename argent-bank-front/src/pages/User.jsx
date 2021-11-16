import UserAccount from "../components/UserAccount";
import MainLayout from "../layouts/MainLayout";
import {useHistory} from "react-router-dom";
import {getTokenFromCookie} from "../utils/utils";
import UserNameEditor from "../components/UserNameEditor";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {retrieveUserData} from "../store/thunks";
import React from "react";

//The UserAccount component uses placeholder data here

function User() {
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.login.userData)
    const dispatch = useDispatch()
    const history = useHistory()
    const token = getTokenFromCookie()

    useEffect(() => {
        if (!userData) {
            if (token) {
                dispatch(retrieveUserData)
            }else{
                history.push('/sign-in')
            }
        }else{
            document.title = `Argent Bank - ${userData?.firstName} ${userData?.lastName} accounts`
            setLoading(false)
        }
    }, [userData])

    if (loading) return <div>Loading data</div>

    if (userData) {
        return (
            <MainLayout>
                <main className="main bg-dark">
                    <UserNameEditor firstName={userData.firstName} lastName={userData.lastName} />
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
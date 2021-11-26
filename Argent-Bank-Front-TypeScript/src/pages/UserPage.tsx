import MainLayout from "../layouts/MainLayout";
import UserAccount from "../components/UserAccount";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/storeHooks";
import UserNameEditor from "../components/userNameEditor";
import {getTokenFromCookie} from "../utils/utils";
import {retrieveUserData} from "../store/thunks";
import {useNavigate} from "react-router-dom";


function UserPage() {
    const [isLoading, setIsLoading] = useState(true)
    const userData = useAppSelector(state => state.login.userData)
    const dispatch = useAppDispatch()
    const token = getTokenFromCookie()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) {
            if (token) {
                dispatch(retrieveUserData)
            }else{
                navigate('/sign-in')
            }
        }else{
            setIsLoading(false)
        }
    }, [userData, token, navigate])

    if (isLoading) return <div>Loading user data...</div>

    if (userData && userData.firstName && userData.lastName) {
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

    return (
        <div>Loading failed, redirecting...</div>
    )
}

export default UserPage
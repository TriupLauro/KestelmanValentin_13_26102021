import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

//Redirect if trying to access user pages without being logged in
//Redirect to the sign-in page
export function useLoginCheck() {
    const userData = useSelector(state => state.login.userData)
    const [redirect, setRedirect] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userData) {
            setRedirect('/sign-in')
            setLoading(false)
        }else{
            document.title = `Argent Bank - ${userData.firstName} ${userData.lastName} accounts`
            setLoading(false)
        }
    }, [])

    return {redirect, loading, userData}
}


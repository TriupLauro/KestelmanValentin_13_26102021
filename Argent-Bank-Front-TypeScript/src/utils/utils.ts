export function getTokenFromCookie() : string | null{
    const tokenCookie = document.cookie.split(';').find(row => row.startsWith('token='))
    if (tokenCookie) {
        return tokenCookie.split('=')[1]
    }else{
        console.log('Cannot read token cookie')
        return null
    }
}

export function generateConfig() : {headers : {Authorization : string}} {
    const token = getTokenFromCookie()

    return {
        headers : {Authorization : `Bearer ${token}`}
    }
}
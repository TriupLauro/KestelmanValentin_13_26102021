export function getTokenFromCookie() {
    if (document.cookie.split(';').find(row => row.startsWith('token='))) {
        return document.cookie
            .split(';').find(row => row.startsWith('token=')).split('=')[1]
    }else{
        console.log('Cannot read token cookie')
        return null
    }
}

export function generateConfig() {
    const token = getTokenFromCookie()
    if (!token) return null

    return {
        headers : {Authorization : `Bearer ${token}`}
    }
}

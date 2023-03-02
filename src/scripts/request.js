const token = localStorage.getItem('@doit:token')
const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}

export async function loginRequest(loginBody){
    const token = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then((response) => {
        if(response.ok){
            const responseJson = response.json().then(({token}) => {
             localStorage.setItem('@doit:token', JSON.stringify(token))
            return token   
            })
            return responseJson

        } else{
            response.json().then(resError => console.log(resError))
        }
    })
    return token
}

export async function registerRequest(registerBody){
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
    .then(response => {
        if(response.ok){
            return response.json()
        } else{
            response.json().then(resError => console.log(resError))
        }
    })
    return newUser
}
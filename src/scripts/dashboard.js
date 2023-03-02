function authentication(){
    const token = localStorage.getItem('@doit:token')

    if(!token){
        window.location.replace('../../index.html')
    }
}
authentication()
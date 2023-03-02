import { registerRequest } from "./request.js"

function authentication(){
    const token = localStorage.getItem('@doit:token')

    if(token){
        window.location.replace('./dashboard.html')
    }
}

const createRegisterPage = () => {
    document.body.insertAdjacentHTML('beforeend', `
    <main>
        <div class="register__container">
            <form class="register__form">
                <div class="form__header">
                    <h2 class="form__title">Cadastro</h2>
                    <a href="../../index.html" class="back__btn">Voltar para o Login</a>
                </div>
                <div class="form__inputs">
                    <label>Usuário</label>
                    <input type="text" name="username" id="usernameRegister" placeholder="Digite seu usuário aqui">
                    <label>Email</label>
                    <input type="email" name="email" id="emailRegister" placeholder="Digite seu email aqui">
                    <label for="">Link da foto do perfil</label>
                    <input type="text" name="avatar" id="photoRegister" placeholder="Insira o link aqui">
                    <label for="">Senha</label>
                    <input type="password" name="password" id="passworRegister" placeholder="Digite sua senha aqui">
                    <button class="btn__register">Cadastrar</button>
                </div>
                <a href="../../index.html" class="back__btn--botton">Voltar para o Login</a>
            </form>
        </div>
        <div class="general__container">
            <h1 class="general__title">PetInfo</h1>
            <h2 class="general__title2">Ooooooba!</h2>
            <p class="general__text">Agora vamos poder contribuir para o bem estar do seu pet por meio do conhecimento</p>
            <div>
                <img src="../assets/img/Rectangle 2.png" alt="cat eyes closed">
                <img src="../assets/img/Rectangle 3.png" alt="cat layed down">
                <img src="../assets/img/Rectangle 5.png" alt="dog smiling">
                <img src="../assets/img/Rectangle 4.png" alt="cat looking">
            </div>
        </div>
    </main>
    `) 
 }
 createRegisterPage()

function handleRegister(){
    const inputs = document.querySelectorAll('input')
    const button = document.querySelector('.btn__register')
    const registerBody = {}
    let emptyInput = 0;

    button.addEventListener('click', async (event) =>{
        event.preventDefault()

        inputs.forEach(({name, value}) => {
            if(value === ''){
                emptyInput++
            }
            registerBody[name] = value;
        })
        if (emptyInput !== 0){
            return alert('Por favor preencha todos os campos necessários para realizar o cadastro')
        } else{
            const newUser = await registerRequest(registerBody)

            setTimeout(() => {
                window.location.replace('../../index.html')
            }, 1000);
        }
        
    })
 }
 handleRegister()
 authentication()
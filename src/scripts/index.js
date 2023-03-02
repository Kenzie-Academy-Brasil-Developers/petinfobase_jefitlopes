import { loginRequest } from "./request.js";

const createPage = () => {
    document.body.insertAdjacentHTML('beforeend', `
    <main>
        <div class="site__introduction">
            <h1 class="site__title">PetInfo</h1>
            <h2 class="site__subtitle">Amor e carinho por meio do conhecimento</h2>
            <p class="site__text">Todas as informações para melhorar a vida do seu pet em um só lugar</p>
            <div class="site__img">
                <img src="./src/assets/img/cat_img1.png" alt="cat looking">
                <img src="./src/assets/img/dog_img1.png" alt="dog looking">
                <img src="./src/assets/img/cat_img2.png" alt="cat impressed">
                <img src="./src/assets/img/dog_img2.png" alt="dog layed down">
            </div>
        </div>
        <div class="login__container">
            <form action="" class="login__form">
                <h2>login</h2>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu email aqui">
                    <label for="">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha aqui">
                    <button class="login__btn">Acessar</button>
                </div>
                <p class="create__title">Ainda não possui conta?</p>
                <p class="create__text">Clicando no botão abaixo, você pode se cadastrar rapidamente</p>
                <button class="register__btn">Cadastrar</button>
            </form>
        </div>
    </main>
    `) 
 }
 createPage()

 function handleLogin(){
    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('.login__btn');
    const loginBoody = {};
    let count = 0;

    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value === ''){
                count++
            }
            loginBoody[input.name] = input.value;
        })
        if (count !== 0){
            return alert('Por favor preencha os campos e tente novamente')
        } else{
            const token = await loginRequest(loginBoody)
            return token;
        }
    })
 }
 handleLogin()
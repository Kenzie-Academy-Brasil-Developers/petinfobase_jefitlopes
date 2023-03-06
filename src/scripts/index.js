import { toast } from "./render.js";
import { getUserProfile, login } from "./request.js";

function authentication() {
    const token = localStorage.getItem('@petInfo:token');
  
    if(token) {
      window.location.replace('./src/pages/dashboard.html');
    }
  }
  
export function handleLogin (){
    const inputEmail = document.querySelector('.input__email');
    const inputPassword = document.querySelector('.input__password');
    const submitButton = document.querySelector('.btn__submit');
    let count = 0;

    submitButton.addEventListener('click', async (event) =>{
        event.preventDefault();
    
        if(inputEmail.value == '' || inputPassword.value == ''){
            count++;
        }

        const loginBody ={
        email: inputEmail.value,
        password: inputPassword.value
        };
        
        if(count != 0){
            count = 0;
            inputEmail.value = '';
            inputPassword.value = '';
            toast('Informe os dados', 'Por favor, forneça o email e senha de login', '', 'redLogin');
            return;
        } else {
            const token = await login(loginBody);
            inputEmail.value = '';
            inputPassword.value = '';
            await getUserProfile()
            return token;
        }
    })
}

// export function handleGoToRegister (){
//     const buttonRegister = document.querySelector('.btn__register');

//     buttonRegister.addEventListener('click', (event) =>{
//         event.preventDefault();
//         window.location.replace('./src/pages/register.html');
//     })
// }

authentication();
handleLogin();
// handleGoToRegister();






// import { loginRequest } from "./request.js";

// function authentication(){
//     const token = localStorage.getItem('@doit:token')

//     if(token){
//         window.location.replace('./src/pages/dashboard.html')
//     }
// }

// const createPage = () => {
//     document.body.insertAdjacentHTML('beforeend', `
//     <main>
//         <div class="site__introduction">
//             <h1 class="site__title">PetInfo</h1>
//             <h2 class="site__subtitle">Amor e carinho por meio do conhecimento</h2>
//             <p class="site__text">Todas as informações para melhorar a vida do seu pet em um só lugar</p>
//             <div class="site__img">
//                 <img src="./src/assets/img/cat_img1.png" alt="cat looking">
//                 <img src="./src/assets/img/dog_img1.png" alt="dog looking">
//                 <img src="./src/assets/img/cat_img2.png" alt="cat impressed">
//                 <img src="./src/assets/img/dog_img2.png" alt="dog layed down">
//             </div>
//         </div>
//         <div class="login__container">
//             <form action="" class="login__form">
//                 <h2>login</h2>
//                 <div>
//                     <label for="">Email</label>
//                     <input type="email" name="email" id="email" placeholder="Digite seu email aqui">
//                     <label for="">Senha</label>
//                     <input type="password" name="password" id="password" placeholder="Digite sua senha aqui">
//                     <button class="login__btn">Acessar</button>
//                 </div>
//                 <p class="create__title">Ainda não possui conta?</p>
//                 <p class="create__text">Clicando no botão abaixo, você pode se cadastrar rapidamente</p>
//                 <a href="./src/pages/register.html" class="register__btn">Cadastrar</a>
//             </form>
//         </div>
//     </main>
//     `) 
//  }
//  createPage()

//  function handleLogin(){
//     const inputs = document.querySelectorAll('input');
//     const button = document.querySelector('.login__btn');
//     const loginBoody = {};
//     let count = 0;

//     button.addEventListener('click', async (event) => {
//         event.preventDefault()

//         inputs.forEach(({name, value}) => {
//             if(value === ''){
//                 count++
//             }
//             loginBoody[name] = value;
//         })
//         if (count !== 0){
//             return alert('Por favor preencha os campos e tente novamente')
//         } else{
//             const token = await loginRequest(loginBoody)

//             setTimeout(() => {
//                 window.location.replace('./src/pages/dashboard.html')
//             }, 1000);

//             return token;
//         }
//     });
//  }
//  handleLogin()
//  authentication()
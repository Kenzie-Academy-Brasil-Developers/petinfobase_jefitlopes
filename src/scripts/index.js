import { createToast } from "./render.js";
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
            createToast('Informe os dados', 'Por favor, forneça o email e senha de login', '', 'redLogin');
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


authentication();
handleLogin();
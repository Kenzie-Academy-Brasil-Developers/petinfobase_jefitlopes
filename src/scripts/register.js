import { toast } from "./render.js";
import { createUser } from "./request.js";

function authentication() {
    const token = localStorage.getItem('@petInfo:token');
  
    if(token) {
      window.location.replace('./dashboard.html');
    }
  }

function register (){
    const userInput = document.querySelector('.user__input');
    const emailInput = document.querySelector('.email__input');
    const photoInput = document.querySelector('.photo__input');
    const passwordInput = document.querySelector('.password__input');
    const registerBtn = document.querySelector('.register__btn');
    let count = 0;

    registerBtn.addEventListener('click', async (event) =>{
        event.preventDefault();
        
        if(userInput.value == '' || emailInput.value == '' || photoInput.value == '' || passwordInput.value == ''){
            count++;
        }

        const createBody ={
        username: userInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        avatar: photoInput.value
    };
        if(count != 0){
            count = 0;
            userInput.value = '';
            emailInput.value = '';
            photoInput.value = '';
            passwordInput.value = '';
            toast('Por favor, preencha todos os campos', '', '', 'redRegister');
            return;
        } else {
            const newUser = await createUser(createBody);
            userInput.value = '';
            emailInput.value = '';
            photoInput.value = '';
            passwordInput.value = '';

            return newUser;
        }
    })
}


register();
authentication();


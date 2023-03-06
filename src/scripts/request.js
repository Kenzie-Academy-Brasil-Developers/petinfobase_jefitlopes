import { renderProfilePhoto, toast, showLogout } from "./render.js";

const baseURL = 'http://localhost:3333';
const token = JSON.parse(localStorage.getItem("@petInfo:token")) || "";
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
};

export async function login (loginBody) {  
    const token = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    }).then((response) =>{
        if(response.ok){
           const UserToken = response.json().then((responseJson) =>{
            localStorage.setItem(
                "@petInfo:token",
                JSON.stringify(responseJson.token)
            )
            window.location.replace('./src/pages/dashboard.html');
            
            return responseJson;
           })
           return UserToken;
        } else {
            response.json().then((responseError) =>{
                toast('Email e/ou senha incorreto', 'Favor tentar novamente', '', 'red');
            })
        }
    })
    return token;
}

export async function createUser (createBody){
    const newUser = await fetch(`${baseURL}/users/create`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    }).then((response)=>{
        if(response.ok){
            toast('Sua conta foi criada com sucesso!', 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ', "../../index.html" )
            
            setTimeout(() => {
                window.location.replace('../../index.html');
              }, 5000)
            
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        }
    })
    return newUser;
}

export async function getAllPosts (){
    const allPosts = await fetch(`${baseURL}/posts`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) => response.json())

    return allPosts;
}

export async function updatePost (postBody, postId){
    const updated = await fetch(`${baseURL}/posts/${postId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    }).then((response) =>{
        if(response.ok){
            toast('Post editado com sucesso!','O post agora contém as novas informações passadas');
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        } 
    })

    return updated;
}

export async function deletePost (postId){
    const deleted = await fetch(`${baseURL}/posts/${postId}`, {
        method: "DELETE",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            toast('Post deletado com sucesso!','O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed');
            
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        } 
    })

    return deleted;
}

export async function createPost (postBody){
    const newPost = await fetch(`${baseURL}/posts/create`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    }).then((response)=>{
        if(response.ok){
            toast('Post criado com sucesso!','Seu post foi criado com sucesso, a partir de agora ele aparecerá no seu feed')

            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        }
    })
    return newPost;
}
        export async function getUserProfile (){
            const userProfile = await fetch(`${baseURL}/users/profile`, {
                method: "GET",
                headers: requestHeaders
            }).then((response) =>{
                if(response.ok){
                    const userData = response.json().then((responseJson) =>{
                        localStorage.setItem(
                            "@petInfo:data",
                            JSON.stringify(responseJson)
                        )
                        
                        return responseJson;
                       }).then(async(res) =>{
                        await renderProfilePhoto();
                        showLogout();                       
                       })
                } else {
                    response.json().then((responseError) =>{
                    })
                }
            })
        
            return userProfile;
        }




// const token = localStorage.getItem('@doit:token')
// const baseUrl = 'http://localhost:3333'
// const requestHeaders = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
// }

// export async function loginRequest(loginBody){
//     const token = await fetch(`${baseUrl}/login`, {
//         method: 'POST',
//         headers: requestHeaders,
//         body: JSON.stringify(loginBody)
//     })
//     .then((response) => {
//         if(response.ok){
//             const responseJson = response.json().then(({token}) => {
//              localStorage.setItem('@doit:token', JSON.stringify(token))
//             return token   
//             })
//             return responseJson

//         } else{
//             response.json().then(resError => console.log(resError))
//         }
//     })
//     return token
// }

// export async function registerRequest(registerBody){
//     const newUser = await fetch(`${baseUrl}/users/create`, {
//         method: 'POST',
//         headers: requestHeaders,
//         body: JSON.stringify(registerBody)
//     })
//     .then(response => {
//         if(response.ok){
//             return response.json()
//         } else{
//             response.json().then(resError => console.log(resError))
//         }
//     })
//     return newUser
// }

// export async function getProfile (){
//     const userProfile = await fetch(`${baseUrl}/users/profile`, {
//         method: "GET",
//         headers: requestHeaders
//     }).then((response) =>{
//         if(response.ok){
//             const userData = response.json().then((responseJson) =>{
//                 localStorage.setItem(
//                     "@petInfo:data",
//                     JSON.stringify(responseJson)
//                 )
                
//                 return responseJson;
//                }).then(async(res) =>{
//                 await renderPerfilPhoto();
//                 showLogout();                       
//                })
//         } else {
//             response.json().then((responseError) =>{
//             })
//         }
//     })

//     return userProfile;
// }

// export async function creatPost(postBody){
//     const newPost = await fetch(`${baseUrl}/posts/create`,{
//         method: 'POST',
//         headers: requestHeaders,
//         body: JSON.stringify(postBody)
//     })
//     .then((response) => {
//         if(response.ok) {
//             const postJson = response.json().then(resJson => {
//                 alert('Post criado com sucesso')

//                 return postJson
//             })
//             return postJson
//         } else{
//             response.json().then(({message}) => 
//             alert(message)
//             )
//         }
//     })
// }

// // // Função assíncrona para criar um post
// // async function createPost(token, postContent) {
// //     // Define o cabeçalho da requisição com o token de autorização
// //     const headers = {
// //       'Authorization': `Bearer ${token}`
// //     };
    
// //     // Define o corpo da requisição com o conteúdo do post
// //     const data = {
// //       'content': postContent
// //     };
    
// //     try {
// //       // Faz a requisição usando o método POST
// //       const response = await fetch(`${baseUrl}/posts/create`, {
// //         method: 'POST',
// //         headers: headers,
// //         body: JSON.stringify(data)
// //       });
      
// //       // Verifica se a requisição foi bem-sucedida
// //       if (!response.ok) {
// //         throw new Error('Erro ao criar o post');
// //       }
      
// //       // Retorna a resposta em formato JSON
// //       const responseData = await response.json();
      
// //       // Processa a resposta
// //       console.log('Post criado com sucesso');
// //       console.log(responseData);
// //     } catch (error) {
// //       // Trata erros
// //       console.error(error);
// //     }
// //   }
  
// //   // Chama a função de criar post ao clicar no botão de enviar
// //   document.getElementById('enviar').addEventListener('click', function() {
// //     // Obtém o token do usuário da sessão
// //     const token = sessionStorage.getItem('token');
    
// //     // Obtém o conteúdo do post
// //     const postContent = document.getElementById('post-content').value;
    
// //     // Cria o post
// //     createPost(token, postContent);
// //   });
  
  

// export async function readAllPost(){
//     const posts = await fetch (`${baseUrl}/posts`, {
//     method: 'GET',
//     headers: requestHeaders,
//     })
//     .then(response => {
//         if(response.ok){
//             return response.json()
//         } else{
//             response.json().then(({message}) => {
//                 alert(message)
//             })
//         }
//     })
//     return posts;
// }

// export async function postUpdate (postBody, postId){
//     const update = await fetch(`${baseUrl}/posts/${postId}`, {
//         method: "PATCH",
//         headers: requestHeaders,
//         body: JSON.stringify(postBody)
//     }).then((response) =>{
//         if(response.ok){
//             toast('Post editado com sucesso!','O post agora contém as novas informações passadas');
//             return response.json();
//         } else {
//             response.json().then((responseError) =>{
//             })
//         } 
//     })

//     return update;
// }

// export async function deletePost(postId){
//     const del = await fetch(`${baseUrl}/posts/${postId}`, {
//         method: "DELETE",
//         headers: requestHeaders
//     })
//     .then(response => {
//         if(response.ok){
//             toast('Post deletado com sucesso!')

//             return response.json()
//         } else{
//             response.json().then(({message}) => {
//                 alert(message);
//             })
//         }
//     })
//     return del 
// }
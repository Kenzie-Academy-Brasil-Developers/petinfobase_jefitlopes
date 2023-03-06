import { handleModalDelete, handleModalEdit, handleModalNewPost, handleModalOld } from "./modal.js";
import { getAllPosts } from "./request.js";

const userData = JSON.parse(localStorage.getItem("@petInfo:data")) || "";

export async function render (){
    const list = document.querySelector('ul');

    list.innerHTML = '';

    const posts = await getAllPosts();
    
    posts.forEach(post => {
        const card = createCard(post);

        list.appendChild(card);
    });
    handleModalOld(posts);
    handleModalDelete(posts);
    handleModalEdit(posts);
    handleModalNewPost(posts);
}

export function createCard (post){
    const userData3 = JSON.parse(localStorage.getItem("@petInfo:data")) || "";
    const liContainer = document.createElement('li');

    const articleContainer = document.createElement('article');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile__container');

    const dataContainer = document.createElement('div');
    dataContainer.classList.add('data__container');

    const image = document.createElement('img');
    image.src = post.user.avatar;
    image.alt = post.user.username;

    const paragraphName = document.createElement('p');
    paragraphName.innerText = post.user.username;

    const span = document.createElement('span');
    span.innerText = '|';

    const small = document.createElement('small');
    const options = {month: 'long', year: 'numeric'};
    small.innerHTML = new Date(post.createdAt).toLocaleDateString("pt-BR", options);

    dataContainer.append(image, paragraphName, span, small);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn__container');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit__btn');
    editBtn.innerText = 'Editar';
    editBtn.dataset.postId = post.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete__btn');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.dataset.postId = post.id;

    btnContainer.append(editBtn, deleteBtn);
    
    if(post.user.id != userData3.id){
        btnContainer.removeChild(editBtn);
        btnContainer.removeChild(deleteBtn);
    }
    
    profileContainer.append(dataContainer, btnContainer);
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('text__container');

    const h1 = document.createElement('h1');
    h1.innerHTML = post.title;

    const paragraphText = document.createElement('p');
    
    if(post.content.length < 145){
        paragraphText.innerHTML = post.content;    
    } else {
        paragraphText.innerHTML = `${post.content.substring(0, 145)}...`;
    }

    const ancor = document.createElement('button');
    ancor.innerText = 'Acessar publicação';
    ancor.dataset.postId = post.id;

    textContainer.append(h1, paragraphText, ancor);

    articleContainer.append(profileContainer, textContainer);

    liContainer.appendChild(articleContainer);

    return liContainer;
}

export function createNewCard(post) {
    const user_data = JSON.parse(localStorage.getItem("@petInfo:data")) || "";
    const li_container = document.createElement('li');

    const article_container = document.createElement('article');

    const profile_container = document.createElement('div');
    profile_container.classList.add('profile__container');

    const data_container = document.createElement('div');
    data_container.classList.add('data__container');

    const image = document.createElement('img');
    image.src = post.user.avatar;
    image.alt = post.user.username;

    const paragraph_name = document.createElement('p');
    paragraph_name.innerText = post.user.username;

    const span = document.createElement('span');
    span.innerText = '|';

    const small = document.createElement('small');
    const options = { month: 'long', year: 'numeric' };
    small.innerHTML = new Date(post.createdAt).toLocaleDateString("pt-BR", options);

    data_container.append(image, paragraph_name, span, small);

    const btn_container = document.createElement('div');
    btn_container.classList.add('btn__container');

    const edit_btn = document.createElement('button');
    edit_btn.classList.add('edit__btn');
    edit_btn.innerText = 'Editar';
    edit_btn.dataset.postId = post.id;

    const delete_btn = document.createElement('button');
    delete_btn.classList.add('delete__btn');
    delete_btn.innerText = 'Excluir';
    delete_btn.dataset.postId = post.id;

    btn_container.append(edit_btn, delete_btn);

    if (post.user.id != user_data.id) {
    btn_container.removeChild(edit_btn);
    btn_container.removeChild(delete_btn);
    }

    profile_container.append(data_container, btn_container);

    const text_container = document.createElement('div');
    text_container.classList.add('text__container');

    const h1 = document.createElement('h1');
    h1.innerHTML = post.title;

    const paragraph_text = document.createElement('p');

    if (post.content.length < 145) {
    paragraph_text.innerHTML = post.content;
    } else {
    paragraph_text.innerHTML = `${post.content.substring(0, 145)}...`;
    }

    const anchor = document.createElement('button');
    anchor.innerText = 'Acessar publicação';
    anchor.dataset.postId = post.id;

    text_container.append(h1, paragraph_text, anchor);

    article_container.append(profile_container, text_container);

    li_container.appendChild(article_container);

    return li_container;
}


export function createToast (newTitle, newMessage, newLink, newColor){
    const body = document.querySelector('body');
    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast__container', 'toast__add');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title__container');

    const imageContainer = document.createElement('div');

    const toastImage = document.createElement('img');
    toastImage.src = "../assets/icons/check-solid.svg";
    toastImage.alt = "Check Icon";

    imageContainer.appendChild(toastImage);

    const toastTitle = document.createElement('h2');
    toastTitle.innerHTML = newTitle;

    titleContainer.append(imageContainer, toastTitle);

    const toastText = document.createElement('small');
    toastText.innerHTML = newMessage;

    const toastAncor = document.createElement('a');
    toastAncor.href = newLink;
    toastAncor.innerText = "Acessar página de login";

    toastText.appendChild(toastAncor);

    if(newTitle != 'Sua conta foi criada com sucesso!'){
        toastText.removeChild(toastAncor);
    }

    toastContainer.append(titleContainer, toastText);

    body.appendChild(toastContainer);

    if(newColor == 'red'){
        toastImage.src = "./src/assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }

    if(newColor == 'redLogin'){
        toastImage.src = "./src/assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }

    if(newColor == 'redRegister'){
        toastImage.src = "../assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }

    setTimeout(() => {
        toastContainer.classList.add('toast__remove')
    }, 5000)

  setTimeout(() => {
    body.removeChild(toastContainer)
  }, 6990);
}


export function createModalPost (id, array){
    const modalContainerNew = document.createElement('div');
    const modalProfileContainerNew = document.createElement('div');
    const modalDataContainerNew = document.createElement('div');
    const modalImageNew = document.createElement('img');
    const modalParagraphNameNew = document.createElement('p');
    const modalSpanNew = document.createElement('span');
    const modalSmallNew = document.createElement('small');
    const modalBtnContainerNew = document.createElement('div');
    const modalBtnNew = document.createElement('button');
    const modalTextContainerNew = document.createElement('div');
    const modalH1New = document.createElement('h1');
    const modalParagraphTextNew = document.createElement('p');
    
    const postFound = array.find(post => post.id == id);
    modalContainerNew.classList.add('modal__container--oldPosts');
    modalProfileContainerNew.classList.add('modal__profile__container--oldPosts');
    modalDataContainerNew.classList.add('modal__data__container--oldPosts');
    modalImageNew.src = postFound.user.avatar;
    modalImageNew.alt = postFound.user.username;
    modalParagraphNameNew.innerHTML = postFound.user.username;
    modalSpanNew.innerText = '|';
    const options = {month: 'long', year: 'numeric'};
    modalSmallNew.innerHTML = new Date(postFound.createdAt).toLocaleDateString("pt-BR", options);
    
    modalDataContainerNew.append(modalImageNew, modalParagraphNameNew, modalSpanNew, modalSmallNew);
    
    modalBtnContainerNew.classList.add('modal__btn__container--oldPosts');
    modalBtnNew.innerText = 'X';
    
    modalBtnContainerNew.appendChild(modalBtnNew);

    modalProfileContainerNew.append(modalDataContainerNew, modalBtnContainerNew);
    
    modalTextContainerNew.classList.add('modal__text__container--oldPosts');
    modalH1New.innerHTML = postFound.title;
    modalParagraphTextNew.innerText = postFound.content;

    modalTextContainerNew.append(modalH1New, modalParagraphTextNew);

    modalContainerNew.append(modalProfileContainerNew, modalTextContainerNew);

    return modalContainerNew;
}



export function createModalNewPost(id, array) {
    const newPostsModalContainer = document.createElement('div');
    newPostsModalContainer.classList.add('modal__container--newPosts');
    
    const newPostsModalProfileContainer = document.createElement('div');
    newPostsModalProfileContainer.classList.add(
    'modal__profile__container--newPosts'
    );
    
    const newPostsModalH1 = document.createElement('h1');
    newPostsModalH1.innerText = 'Criando novo post';
    
    const newPostsModalCloseBtn = document.createElement('button');
    newPostsModalCloseBtn.innerText = 'X';
    
    newPostsModalProfileContainer.append(
    newPostsModalH1,
    newPostsModalCloseBtn
    );
    
    const newPostsModalTextAreaContainer = document.createElement('div');
    
    const newPostsModalForm = document.createElement('form');
    
    const newPostsModalTitleContainer = document.createElement('div');
    newPostsModalTitleContainer.classList.add(
    'modal__title__container--newPosts'
    );
    
    const newPostsModalLabelTitle = document.createElement('label');
    newPostsModalLabelTitle.setAttribute('for', 'title');
    newPostsModalLabelTitle.innerText = 'Título do post';
    
    const newPostsModalTextAreaTitle = document.createElement('textarea');
    newPostsModalTextAreaTitle.setAttribute('name', 'title');
    newPostsModalTextAreaTitle.setAttribute('cols', '90');
    newPostsModalTextAreaTitle.setAttribute('rows', '1');
    newPostsModalTextAreaTitle.setAttribute(
    'placeholder',
    'Digite o título aqui...'
    );
    
    newPostsModalTitleContainer.append(
    newPostsModalLabelTitle,
    newPostsModalTextAreaTitle
    );
    
    const newPostsModalTextContainer = document.createElement('div');
    newPostsModalTextContainer.classList.add(
    'modal__text__container--newPosts'
    );
    
    const newPostsModalLabelText = document.createElement('label');
    newPostsModalLabelText.setAttribute('for', 'text');
    newPostsModalLabelText.innerText = 'Conteúdo do post';
    
    const newPostsModalTextAreaText = document.createElement('textarea');
    newPostsModalTextAreaText.setAttribute('name', 'text');
    newPostsModalTextAreaText.setAttribute('cols', '90');
    newPostsModalTextAreaText.setAttribute('rows', '10');
    newPostsModalTextAreaText.setAttribute('wrap', 'soft');
    newPostsModalTextAreaText.setAttribute(
    'placeholder',
    'Desenvolva o conteúdo do post aqui...'
    );
    
    newPostsModalTextContainer.append(
    newPostsModalLabelText,
    newPostsModalTextAreaText
    );
    
    const newPostsModalBtnContainer = document.createElement('div');
    newPostsModalBtnContainer.classList.add('modal__btn__container--newPosts');
    
    const newPostsModalCancelPost = document.createElement('button');
    newPostsModalCancelPost.classList.add('cancel__btn__newPost');
    newPostsModalCancelPost.innerText = 'Cancelar';
    
    const newPostsModalSendPost = document.createElement('button');
    newPostsModalSendPost.classList.add('send__btn');
    newPostsModalSendPost.innerText = 'Publicar';
    
    newPostsModalBtnContainer.append(
    newPostsModalCancelPost,
    newPostsModalSendPost
    );
    
    newPostsModalForm.append(
    newPostsModalTitleContainer,
    newPostsModalTextContainer,
    newPostsModalBtnContainer
    );
    
    newPostsModalTextAreaContainer.appendChild(newPostsModalForm);
    
    newPostsModalContainer.append(
    newPostsModalProfileContainer,
    newPostsModalTextAreaContainer
    );
    
    return newPostsModalContainer;
    }


export function createModalDelete(id, array) {
    const postFound = array.find((post) => post.id == id);
  
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--deletePosts');
  
    const modalProfileContainer = document.createElement('div');
    modalProfileContainer.classList.add('modal__profile__container--deletePosts');
  
    const modalHeading = document.createElement('h2');
    modalHeading.innerText = 'Confirmação de exclusão';
  
    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerText = 'X';
  
    modalProfileContainer.append(modalHeading, modalCloseBtn);
  
    const modalTextContainer = document.createElement('div');
    modalTextContainer.classList.add('modal__text__container--deletePosts');
  
    const modalTitle = document.createElement('h1');
    modalTitle.innerText = 'Tem certeza que deseja excluir este post?';
  
    const modalContent = document.createElement('p');
    modalContent.innerText =
      'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir';
  
    modalTextContainer.append(modalTitle, modalContent);
  
    const modalBtnContainer = document.createElement('div');
    modalBtnContainer.classList.add('modal__btn__container--deletePosts');
  
    const modalCancelBtn = document.createElement('button');
    modalCancelBtn.classList.add('cancel__btn__deletePosts');
    modalCancelBtn.innerText = 'Cancelar';
  
    const modalDeleteBtn = document.createElement('button');
    modalDeleteBtn.classList.add('confirm__btn');
    modalDeleteBtn.innerText = 'Sim, excluir este post';
    modalDeleteBtn.dataset.postId = postFound.id;
  
    modalBtnContainer.append(modalCancelBtn, modalDeleteBtn);
  
    modalContainer.append(modalProfileContainer, modalTextContainer, modalBtnContainer);
  
    return modalContainer;
  }
  


export function createModalEditPost (id, array){
    const postFound = array.find(post => post.id == id);
    
    const modalEditContainer = document.createElement('div');
    modalEditContainer.classList.add('modal__container--editPosts');
   
    const modalEditProfileContainer = document.createElement('div');
    modalEditProfileContainer.classList.add('modal__profile__container--editPosts');
    
    const modalEditH1 = document.createElement('h1');
    modalEditH1.innerText = 'Edição';

    const modalEditCloseBtn = document.createElement('button');
    modalEditCloseBtn.innerText = 'X';
    
    modalEditProfileContainer.append(modalEditH1, modalEditCloseBtn);

    const modalEditTextAreaContainer = document.createElement('div');
    
    const modalEditForm = document.createElement('form');
    
    const modalEditTitleContainer = document.createElement('div');
    modalEditTitleContainer.classList.add('modal__title__container--editPosts');
    
    const modalEditLabelTitle = document.createElement('label');
    modalEditLabelTitle.setAttribute('for', 'title');
    modalEditLabelTitle.innerText = 'Título do post';
    
    const modalEditTextAreaTitle = document.createElement('textarea');
    modalEditTextAreaTitle.setAttribute('name', 'title');
    modalEditTextAreaTitle.setAttribute('cols', '90');
    modalEditTextAreaTitle.setAttribute('rows', '1');
    modalEditTextAreaTitle.innerHTML = postFound.title;
    
    modalEditTitleContainer.append(modalEditLabelTitle, modalEditTextAreaTitle);
    
    const modalEditTextContainer = document.createElement('div');
    modalEditTextContainer.classList.add('modal__text__container--editPosts');
    
    const modalEditLabelText = document.createElement('label');
    modalEditLabelText.setAttribute('for', 'text');
    modalEditLabelText.innerText = 'Conteúdo do post';
    
    const modalEditTextAreaText = document.createElement('textarea');
    modalEditTextAreaText.setAttribute('name', 'text');
    modalEditTextAreaText.setAttribute('rows', '10');
    modalEditTextAreaText.setAttribute('cols', '90');
    modalEditTextAreaText.setAttribute('wrap', 'soft');
    modalEditTextAreaText.innerHTML = postFound.content;
    
    modalEditTextContainer.append(modalEditLabelText, modalEditTextAreaText);

    const modalEditBtnContainer = document.createElement('div');
    modalEditBtnContainer.classList.add('modal__btn__container--editPosts');

    const modalEditCancelPost = document.createElement('button');
    modalEditCancelPost.classList.add('cancel__btn');
    modalEditCancelPost.innerText = 'Cancelar';

    const modalEditSavePost = document.createElement('button');
    modalEditSavePost.classList.add('save__btn');
    modalEditSavePost.innerText = 'Salvar alterações';
    modalEditSavePost.dataset.postId = postFound.id;
    modalEditBtnContainer.append(modalEditCancelPost, modalEditSavePost);
    
    modalEditForm.append(modalEditTitleContainer, modalEditTextContainer, modalEditBtnContainer);

    modalEditTextAreaContainer.appendChild(modalEditForm);

    modalEditContainer.append(modalEditProfileContainer, modalEditTextAreaContainer);

    return modalEditContainer;
}



export async function renderProfilePhoto() {
    const photoContainer = document.querySelector('.post__create');
    const userData = JSON.parse(localStorage.getItem("@petInfo:data")) || "";
    const userName = document.querySelector('.username__menu > p');
    userName.innerText = userData.username;
    
    const photoProfile = await createPhoto(userData);
  
    photoContainer.append(photoProfile);
  }
  
  export async function createPhoto(userData) {
    const photoProfile = document.createElement('img');
    photoProfile.src = userData.avatar;
    photoProfile.alt = userData.username;
    
    return photoProfile;
  }
  


export async function showLogout() {
    const button = document.querySelector(".post__create > img");
    // const background = document.querySelector(".logout__menu--after");
    const logoutOption = document.querySelector(".logout__menu");
  
    button.addEventListener("click", () => {
      // background.classList.toggle("hidden");
      logoutOption.classList.toggle("hidden");
      
      const buttonLogout = document.querySelector(".icon");
      
      buttonLogout.addEventListener("click", () => {
        localStorage.clear();
        window.location.replace("../../index.html");
      })
    })
  }

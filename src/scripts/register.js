const createPage = () => {
    document.body.insertAdjacentHTML('beforeend', `
    <main>
        <div class="register__container">
            <form class="register__form">
                <div class="form__header">
                    <h2 class="form__title">Cadastro</h2>
                    <button class="back__btn">Voltar para o login</button>
                </div>
                <div class="form__inputs">
                    <label>Usuário</label>
                    <input type="text" name="username" id="usernameRegister" placeholder="Digite seu usuário aqui" required>
                    <label>Email</label>
                    <input type="text" name="email" id="emailRegister" placeholder="Digite seu email aqui" required>
                    <label for="">Link da foto do perfil</label>
                    <input type="text" name="photo" id="photoRegister" placeholder="Insira o link aqui" required>
                    <label for="">Senha</label>
                    <input type="text" name="password" id="passworRegister" placeholder="Digite sua senha aqui" required>
                    <button>Cadastrar</button>
                </div>
                <button>Voltar para o login</button>
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
 createPage()

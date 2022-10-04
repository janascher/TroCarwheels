export default function Login() {
    return `<section id="login">
    <div class="banner">
        <div class="text">
            <p>Seja Bem-vindo ao</p>
            <p class="logo">Tro<span>Car</span>Wheels</p>
        </div>
    </div>
    <div class="lines"></div>
    <div class="form">
        <h1>Acesso</h1>
        <p class="text">Vamos começar a colecionar</p>
        <div class="input">
            <input
                type="email"
                name="email_log"
                id="email_log"
                placeholder=" "
            />
            <label for="email_log">Email:</label>
        </div>
        <div class="input">
            <input
                type="password"
                name="senha_log"
                id="senha_log"
                placeholder=" "
            />
            <label for="senha_log">Senha:</label>
        </div>
        <button id="submitc">Cadastrar</button>
    </div>
</section>`
}
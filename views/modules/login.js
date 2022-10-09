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
                name="email"
                id="email"
                placeholder=" "
            />
            <label for="email">Email:</label>
        </div>
        <div class="input">
            <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
            />
            <label for="password">Senha:</label>
        </div>
        <button id="submit_login">Entrar</button>
    </div>
</section>`
}
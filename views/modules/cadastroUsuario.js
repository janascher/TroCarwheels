export default function CadastroUsuario() {
    return `<section id="cadastro">
    <div class="lines"></div>
    <div class="form">
        <div id="person" class="show">
            <div class="input">
                <input type="text" name="namec" id="namec"placeholder=" "/>
                <label for="namec">Nome:</label>
            </div>
            <div class="input">
                <input type="email" name="emailc" id="emailc" placeholder=" "/>
                <label for="emailc">Email:</label>
            </div>
            <div class="input">
                <input type="text" name="nickc" id="nickc" placeholder=" "/>
                <label for="nickc">Nome de usuario:</label>
            </div>
            <div class="input">
                <input type="tel" name="phonec" id="phonec" placeholder=" "/>
                <label for="phonec">Telefone:</label>
            </div>
            <div class="input">
                <input type="date" name="birth_datec" id="birth_datec" placeholder=" "/>
                <label for="birth_datec">Data de Nascimento:</label>
            </div>
            <div class="input">
                <input type="password" name="passwordc" id="passwordc" placeholder=" "/>
                <label for="passwordc">Senha:</label>
            </div>
            <button id="next">Prosseguir</button>
        </div>
        <div id="local">
            <div class="input">
                <input type="text" name="zipc" id="zipc" placeholder=" "/>
                <label for="zipc">CEP:</label>
            </div>
            <div class="select">
                <label for="statec">Estado:</label>
                <select name="statec" id="statec"></select>
            </div>
            <div class="select">
                <label for="cityc">Municipio:</label>
                <select name="cityc" id="cityc"></select>
            </div>
            <div class="input">
                <input type="text" name="districtc" id="districtc" placeholder=" "/>
                <label for="districtc">Bairro:</label>
            </div>
            <div class="input">
                <input type="text" name="addressc" id="addressc" placeholder=" "/>
                <label for="addressc">Endereço:</label>
            </div>
            <div class="input">
                <input type="text" name="complementc" id="complementc" placeholder=" "/>
                <label for="complementc">Complemento:</label>
            </div>
            <div class="input">
                <input type="number" name="numc" id="numc" placeholder=" "/>
                <label for="numc">Numero:</label>
            </div>
            <button id="submitc">Cadastrar</button>
        </div>
    </div>
    <div class="lines"></div>
</section>
<script type="module" src="./script/main.js"></script>`;
}

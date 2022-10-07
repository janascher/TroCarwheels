import CadastroUsuario from "./cadastroUsuario.js";
import Main from "./main.js";
import Home from "./home.js";
import Login from "./login.js";
import carRegistration from "./carRegistration.js";
import Details from "./details.js";


const pages = {
    cadastroUsuario: CadastroUsuario,
    main: Home,
    login: Login,
    carRegistration: carRegistration,
    details: Details
}

export default pages;
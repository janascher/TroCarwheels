import CadastroUsuario from "./cadastroUsuario.js";
import Main from "./main.js";
import Home from "./home.js";
import UpdateUser from './updateUser.js';
import Login from "./login.js";
import carRegistration from "./carRegistration.js";
import Details from "./details.js";
import catalog from "./catalog.js";
import Confirmation from "./confirmation.js";
import Historic from './historic.js';
import carUpdate from './carUpdate.js';


const pages = {
    cadastroUsuario: CadastroUsuario,
    main: Home,
    login: Login,
    carRegistration: carRegistration,
    details: Details,
    catalog: catalog,
    confirmation: Confirmation,
    historic: Historic,
    updateUser: UpdateUser,
    carUpdate: carUpdate,
}

export default pages;
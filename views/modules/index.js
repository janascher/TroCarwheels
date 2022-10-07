import CadastroUsuario from "./cadastroUsuario.js";
import Main from "./main.js";
import Home from "./home.js";
import Login from "./login.js";
import carRegistration from "./carRegistration.js";
import infoCar from "./infoCar.js";
import selection from "./selection.js";
import catalog from "./catalog.js";


const pages = {
    cadastroUsuario: CadastroUsuario,
    main: Home,
    login: Login,
    carRegistration: carRegistration,
    infoCar: infoCar,
    selection: selection,
    catalog: catalog,
}

export default pages;
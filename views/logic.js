import Register from "./script/register.js";
import Login from "./script/login.js";
import CarRegister from "./script/carRegister.js";
import Home from "./script/home.js";
import Catalog from "./script/catalog.js";
import Details from './script/details.js';
import Confirmation from './script/confirmation.js';
import Hitoric from './script/historic.js';
import UpdateUser from './script/updateUser.js';
import CarUpdate from './script/carUpdate.js'

const scripts = {
    "/": Home,
    "/register": Register,
    "/login": Login,
    "/add": CarRegister,
    "/ad": Catalog,
    "/details": Details,
    "/confirmation": Confirmation,
    "/historic": Hitoric,
    "/update-user": UpdateUser,
    "/update-car": CarUpdate,
}

export function logic(route){
    if (scripts[route.length - 1 === "/"]) {
        route = route.slice(0,-1);
    }
    try{
        return new scripts[route]()
    } catch{
        return null
    }
}
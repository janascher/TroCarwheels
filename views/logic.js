import Register from "./script/register.js";
import Login from "./script/login.js";
import CarRegister from "./script/carRegister.js";
import Home from "./script/home.js";
import Catalog from "./script/catalog.js";
import Details from './script/details.js';
import Confirmation from './script/confirmation.js'

const scripts = {
    "/": Home,
    "/register": Register,
    "/login": Login,
    "/add": CarRegister,
    "/ad": Catalog,
    "/details": Details,
    "/confirmation": Confirmation,
    "/selection": Home,
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
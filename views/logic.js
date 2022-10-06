import Register from "./script/register.js";
import Login from "./script/login.js";
import CarRegister from "./script/carRegister.js";

const scripts = {
    "registration": Register,
    "login": Login,
    "register-car": CarRegister,
}

export function logic(route){
    // if (routes[route.length - 1 === "/"]) {
    //     route = route.slice(0,-1);
    // }
    try{
        return new scripts[route]()
    } catch{
        return null
    }
}
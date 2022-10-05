import Register from "./script/register.js";

const scripts = {
    "registration": Register,
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
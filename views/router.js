import pages from "./modules/index.js";

const routes = {
    "/details": pages.details,
    "/": pages.main,
    "/register": pages.cadastroUsuario,
    "/login": pages.login,
    "/add": pages.carRegistration,
    "/ad": pages.catalog,
    "/confirmation": pages.confirmation,
    "/historic": pages.historic
}

export function router(route){
    if (routes[route.length - 1 === "/"]) {
        route = route.slice(0,-1);
    }
    try{
        return routes[route]()
    } catch{
        return `<p class="red">pagina "${route}" inexistente</p>`
    }
}
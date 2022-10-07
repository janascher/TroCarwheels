import pages from "./modules/index.js";

const routes = {
    "/": pages.main,
    "/register": pages.cadastroUsuario,
    "/login": pages.login,
    "/add": pages.carRegistration,
    "/ad": pages.catalog,
    "infoCar": pages.infoCar,
    "selection": pages.selection
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
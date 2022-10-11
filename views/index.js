import { router } from "./router.js";
import { logic } from "./logic.js";
import URL from "./script/url.js";
const api = new URL().apiUrl;
const app = document.querySelector("#content");
const cookie = document.cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
}, {});

if (cookie.auth) {
    document.querySelector("nav #user span").innerHTML = localStorage.nick;
    document.querySelectorAll(".auth").forEach((el) => {
        el.style.display = "block";
    });
    document.querySelectorAll(".unauth").forEach((el) => {
        el.style.display = "none";
    });
    document.querySelector("nav #user").addEventListener("click", (_evt) => {
        document.querySelector('nav #user').classList.toggle('ondrop');
    });
    document.querySelector("nav #user #update-User").addEventListener("click", (_evt) => {
        app.innerHTML = router("/update-user");
        logic("/update-user");
    });
    document.querySelector("nav #user #logout").addEventListener("click", () => {
        document.cookie = "auth=; expires=; path=/";
            document.querySelectorAll(".auth").forEach((el) => {
                el.style.display = "none";
            });
            document.querySelectorAll(".unauth").forEach((el) => {
                el.style.display = "block";
            });
            app.innerHTML = router("/");
            logic("/");
            localStorage.clear();
    });
} else {
    localStorage.clear();
}

app.innerHTML = router("/");
logic("/");
document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", async function (e) {
        e.preventDefault();
        click(e.target.attributes.href.value);
        // app.innerHTML = router(e.target.id);
        logic(e.target.attributes.href.value);
    });
});

function click(link) {
    const url = new CustomEvent("url", {
        detail: {
            link: link,
        },
    });
    app.dispatchEvent(url);
}

app.addEventListener("url", function (cbs) {
    history.pushState({}, ``, `${cbs.detail.link}`);
    app.innerHTML = router(cbs.detail.link);
});
// retornar e avançar pagina
window.addEventListener("popstate", (evt) => {
    app.innerHTML = router(evt.target.location.pathname);
});
// carregamento da pagina
// window.addEventListener("load", (evt) => {
//     app.innerHTML = router(evt.target.location.pathname);
//     logic(evt.target.location.pathname)
// });

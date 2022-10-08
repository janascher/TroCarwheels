import { router } from "./router.js";
import { logic } from "./logic.js";
import URL from './script/url.js'
const api_url = new URL("http://localhost:8000")
const app = document.querySelector("#content");
const cookie = document.cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
}, {});

if (cookie.auth) {
    document.querySelectorAll(".auth").forEach((el) => {
        el.style.display = "block";
    });
    document.querySelectorAll(".unauth").forEach((el) => {
        el.style.display = "none";
    });
}else{
    localStorage.clear()
}

app.innerHTML = router("/");
logic("/");
document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", async function (e) {
        e.preventDefault();
        click(e.target.attributes.href.value)
        // app.innerHTML = router(e.target.id);
        logic(e.target.attributes.href.value);
    });
});

function click(link) {
  const url = new CustomEvent("url", {
    detail: {
      link: link
    }
  });
  app.dispatchEvent(url);
}

app.addEventListener('url', function(cbs){
  history.pushState({}, ``, `${cbs.detail.link}`);
  app.innerHTML = router(cbs.detail.link);
})
// retornar e avançar pagina
window.addEventListener("popstate", (evt) => {
  app.innerHTML = router(evt.target.location.pathname);
});
// carregamento da pagina
window.addEventListener("load", (evt) => {
  app.innerHTML = router(evt.target.location.pathname);
});

export default api_url

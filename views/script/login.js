import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
class Login {
    constructor() {
        this.email = document.querySelector("input#email");
        this.password = document.querySelector("input#password");
        this.btn_log = document.getElementById("submit_login");
        this.access();
    }

    access() {
        this.btn_log.addEventListener("click", async () => {
            try {
                let erros = [];
                if (
                    !this.email.checkValidity() ||
                    this.email.value.length == 0
                ) {
                    erros.push("email");
                }
                if (this.password.value.length < 3) {
                    erros.push("password");
                }
                if (erros.length > 0) {
                    throw erros;
                }
                let _data = {
                    pwd: this.password.value,
                    email: this.email.value,
                };
                let res = await fetch(`${api}/api/users/login`, {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                });
                let {data} = await res.json();
                if(data.nick){
                    localStorage.email=data.email
                    localStorage.name=data.name
                    localStorage.nick=data.nick
                    localStorage.user_class=data.user_class
                    localStorage.user_id=data.user_id
                    document.querySelectorAll(".auth").forEach((el) => {
                        el.style.display = "block";
                    });
                    document.querySelectorAll(".unauth").forEach((el) => {
                        el.style.display = "none";
                    });
                    document.querySelector("nav #user span").innerHTML = localStorage.nick;
                    document.querySelector("#content").innerHTML = router("/");
                    await logic("/");
                }
            } catch (error) {
                console.log(error)
                if(Object.prototype.toString.call(error) === '[object Array]'){
                    error.forEach((err) => {
                        this[err].classList.add("erro");
                        setInterval(() => {
                            this[err].classList.remove("erro");
                        }, 5000);
                    });
                }
            }
        });
    }
}
export default Login;

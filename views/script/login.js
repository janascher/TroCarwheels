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
                await fetch(`${api}/api/users/login`, {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
                    .then((response) => response.json())
                    .then(({data}) => {
                        localStorage.email=data.email
                        localStorage.name=data.name
                        localStorage.nick=data.nick
                        localStorage.user_class=data.user_class
                        localStorage.user_id=data.user_id
                        document.querySelector("#content").innerHTML = router("/");
                        logic("/");
                        document.querySelectorAll(".auth").forEach((el) => {
                            el.style.display = "block";
                        });
                        document.querySelectorAll(".unauth").forEach((el) => {
                            el.style.display = "none";
                        });
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                error.forEach((err) => {
                    this[err].classList.add("erro");
                    setInterval(() => {
                        this[err].classList.remove("erro");
                    }, 5000);
                });
            }
        });
    }
}
export default Login;

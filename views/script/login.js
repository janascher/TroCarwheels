class Login {
    constructor() {
        this.email = document.querySelector("input#email");
        this.password = document.querySelector("input#password");
        this.btn_log = document.getElementById("submit_login");
        this.access()
    }
     
    access() {
        this.btn_log.addEventListener('click', async ()=>{
            try {
                let erros =[]
                if (
                    !this.email.checkValidity() ||
                    this.email.value.length == 0
                ) {
                    erros.push("email");
                }
                if (
                    this.password.value.length < 3
                ) {
                    erros.push("password");
                }
                if (erros.length > 0) {
                    throw erros;
                }
                let _data = {
                    pwd: this.password.value,
                    email: this.email.value
                };
                await fetch("http://localhost:8000/api/users/login", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.log(error)
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
import { router } from "../router.js";
import { logic } from "../logic.js";
class Register {
    constructor(){
        this.name= document.getElementById("namec")
        this.email= document.getElementById("emailc")
        this.nick= document.getElementById("nickc")
        this.password= document.getElementById("passwordc")
        this.address= document.getElementById("addressc")
        this.num= document.getElementById("numc")
        this.complement= document.getElementById("complementc")
        this.city= document.getElementById("cityc")
        this.state= document.getElementById("statec")
        this.district= document.getElementById("districtc")
        this.birth_date= document.getElementById("birth_datec")
        this.zip= document.getElementById("zipc")
        this.phone= document.getElementById("phonec")
        this.submit= document.getElementById("submitc")
        this.formatCEP()
        this.formatPhone()
        this.listStates()
        this.changeStates()
        this.verifyCEP()
        this.verifyRegister()
    }
    formatCEP(){
        this.zip.addEventListener("keydown", (e)=>{
            if (e.target.value.length < 9) {
                if (e.key.match(/[0-9]/gi)) {
                    if (e.target.value.length == 5) {
                        e.target.value += "-";
                    }
                } else if (!e.key.match(/Backspace/gi)) {
                    e.preventDefault();
                }
            } else {
                if (!e.key.match(/Backspace/gi)) {
                    e.preventDefault();
                }
            }
        });
    }
    formatPhone(){
        this.phone.addEventListener("keydown", function (e) {
            if (e.target.value.length < 15) {
                if (e.key.match(/[0-9]/gi)) {
                    if (e.target.value.length == 0) {
                        e.target.value += "(";
                    }
                    if (e.target.value.length == 3) {
                        e.target.value += ") ";
                    }
                    if (e.target.value.length == 10) {
                        e.target.value += "-";
                    }
                } else if (!e.key.match(/Backspace/gi)) {
                    e.preventDefault();
                }
            } else {
                if (!e.key.match(/Backspace/gi)) {
                    e.preventDefault();
                }
            }
        });
    }
    verifyCEP(){
        this.zip.addEventListener("keyup", async (e) => {
            if (e.target.value.length == 9) {
                const res = await fetch(
                    `https://viacep.com.br/ws/${e.target.value}/json/`
                );
                const { localidade, uf, bairro } = await res.json();
                this.district.value = bairro || "";
                this.getStates().then((data) => {
                    this.state.innerHTML = "";
                    data.forEach(({ id, sigla, nome }) => {
                        if (sigla == uf) {
                            this.state.innerHTML += `<option value="${sigla}-${id}" selected>${nome}</option>`;
                        } else {
                            this.state.innerHTML += `<option value="${sigla}-${id}">${nome}</option>`;
                        }
                    });
                    this.getCity(this.state.value.split("-")[1]).then((data) => {
                        this.city.innerHTML = "";
                        data.forEach(({ nome }) => {
                            if (localidade == nome) {
                                this.city.innerHTML += `<option value="${nome}" selected>${nome}</option>`;
                            } else {
                                this.city.innerHTML += `<option value="${nome}">${nome}</option>`;
                            }
                        });
                    });
                });
            }
        });
    }
    async getStates() {
        const res = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
        );
        const data = await res.json();
        return data;
    }
    listStates(){
        this.getStates().then((data) => {
            data.forEach(({ id, sigla, nome }) => {
                this.state.innerHTML += `
                <option value="${sigla}-${id}">${nome}</option>
                `;
            });
            this.getCity(this.state.value.split("-")[1]).then((data) => {
                data.forEach(({ nome }) => {
                    this.city.innerHTML += `<option value="${nome}">${nome}</option>`;
                });
            });
        });
    }
    async getCity(_uf) {
        const res = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${_uf}/municipios`
        );
        const data = await res.json();
        return data;
    }
    changeStates(){
        this.state.addEventListener('change', (evt)=>{
            this.getCity(evt["target"].value.split("-")[1]).then((data) => {
                this.city.innerHTML = "";
                data.forEach(({ nome }) => {
                    this.city.innerHTML += `<option value="${nome}">${nome}</option>`;
                });
            });
        })
    }
    verifyRegister(){
        this.submit.addEventListener("click", async () => {
            try {
                console.log("now")
                let erros = [];
                if (this.name.value.length < 3) {
                    erros.push("name");
                }
                if (this.nick.value.length < 3) {
                    erros.push("nick");
                }
                if (this.password.value.length < 6) {
                    erros.push("password");
                }
                if (this.zip.value.length < 9) {
                    erros.push("zip");
                }
                if (this.phone.value.length < 15) {
                    erros.push("phone");
                }
                if ( !this.email.checkValidity() || this.email.value.length == 0) {
                    erros.push("email");
                }
                if (this.address.value.length<5) {
                    erros.push("address");
                }
                if (this.district.value.length<5) {
                    erros.push("district");
                }
                if (this.birth_date.value == "") {
                    erros.push("birth_date");
                }
                if (this.num.value == "" || this.num.valueAsNumber < 1) {
                    erros.push("num");
                }
        
                if (erros.length > 0) {
                    throw erros;
                }
        
                let _data = {
                    name: this.name.value,
                    email: this.email.value,
                    nick: this.nick.value,
                    password: this.password.value,
                    address: this.address.value,
                    num: this.num.value,
                    complement: this.complement.value,
                    city: this.city.value,
                    state: this.state.value.split("-")[0],
                    district: this.district.value,
                    birth_date: this.birth_date.value.split('-').reverse().join('-'),
                    zip: this.zip.value,
                    phone: this.phone.value,
                };
                console.log(1)
                fetch("http://localhost:8000/api/users", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
                .then((response) => {
                    console.log(2)
                    return response.json()
                })
                .then(({data}) => {
                        console.log(3)
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

export default Register;
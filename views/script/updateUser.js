import URL from "./url.js";
const api = new URL().apiUrl;
import { router } from "../router.js";
import { logic } from "../logic.js";
class UpdateUser {
    constructor() {
        this.name = document.getElementById("namec");
        this.email = document.getElementById("emailc");
        this.nick = document.getElementById("nickc");
        this.password = document.getElementById("passwordc");
        this.address = document.getElementById("addressc");
        this.num = document.getElementById("numc");
        this.complement = document.getElementById("complementc");
        this.city = document.getElementById("cityc");
        this.state = document.getElementById("statec");
        this.district = document.getElementById("districtc");
        this.birth_date = document.getElementById("birth_datec");
        this.zip = document.getElementById("zipc");
        this.phone = document.getElementById("phonec");
        this.newPassword = document.getElementById("newPwd");
        this.submit = document.getElementById("submitc");
        this.getData();
        this.formatCEP();
        this.formatPhone();
        this.listStates();
        this.changeStates();
        this.verifyCEP();
        this.verifyUpdate();
    }
    formatDate(_date) {
        let dtToday;
        if (_date) {
            dtToday = new Date(_date);
        } else {
            dtToday = new Date();
        }

        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        let year = dtToday.getFullYear();

        if (month < 10) month = "0" + month.toString();
        if (day < 10) day = "0" + day.toString();

        let date = year + "-" + month + "-" + day;
        return date;
    }
    async getData() {
        let res = await fetch(`${api}/api/users/${localStorage.user_id}`);
        let { data } = await res.json();
        this.name.value = data[0].name;
        this.nick.value = data[0].nick;
        this.email.value = data[0].email;
        this.district.value = data[0].district;
        this.phone.value = data[0].phone;
        this.complement.value = data[0].complement;
        this.zip.value = data[0].zip;
        this.address.value = data[0].address;
        this.num.value = data[0].num;
        this.password.value = "";
        this.birth_date.value = this.formatDate(data[0].birth_date);
        this.findCEP(data[0].zip);
    }
    formatCEP() {
        this.zip.addEventListener("keydown", (e) => {
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
    formatPhone() {
        this.phone.addEventListener("keydown", function (e) {
            if (e.target.value.length < 14) {
                if (e.key.match(/[0-9]/gi)) {
                    if (e.target.value.length == 0) {
                        e.target.value += "(";
                    }
                    if (e.target.value.length == 3) {
                        e.target.value += ")";
                    }
                    if (e.target.value.length == 9) {
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
    async findCEP(_cep) {
        const res = await fetch(`https://viacep.com.br/ws/${_cep}/json/`);
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
    async verifyCEP() {
        this.zip.addEventListener("keyup", async (e) => {
            if (e.target.value.length == 9) {
                this.findCEP(e.target.value);
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
    listStates() {
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
    changeStates() {
        this.state.addEventListener("change", (evt) => {
            this.getCity(evt["target"].value.split("-")[1]).then((data) => {
                this.city.innerHTML = "";
                data.forEach(({ nome }) => {
                    this.city.innerHTML += `<option value="${nome}">${nome}</option>`;
                });
            });
        });
    }
    verifyUpdate() {
        this.birth_date.max = this.formatDate();
        this.newPassword.addEventListener("click", async () => {
            try {
                let erros = [];
                if (this.password.value.length < 3) {
                    erros.push("password");
                }
                if (erros.length > 0) {
                    throw erros;
                }
                let _data = {
                    pwd: this.password.value,
                };

                let res = await fetch(
                    `${api}/api/users/pwd/${localStorage.user_id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(_data),
                        headers: { "Content-type": "application/json" },
                    }
                );
                let { data } = await res.json();
                document.querySelector("#content").innerHTML = router("/");
                logic("/");
            } catch (error) {
                console.log(error);
                error.forEach((err) => {
                    this[err].classList.add("erro");
                    setInterval(() => {
                        this[err].classList.remove("erro");
                    }, 5000);
                });
            }
        });
        this.submit.addEventListener("click", async () => {
            try {
                let erros = [];
                if (this.name.value.length < 3) {
                    erros.push("name");
                }
                if (this.nick.value.length < 3) {
                    erros.push("nick");
                }
                if (this.phone.value.length < 14) {
                    erros.push("phone");
                }
                if (
                    !this.email.checkValidity() ||
                    this.email.value.length == 0
                ) {
                    erros.push("email");
                }
                if (this.birth_date.value == "") {
                    erros.push("birth_date");
                }
                if (this.zip.value.length < 9) {
                    erros.push("zip");
                }
                if (this.address.value.length < 5) {
                    erros.push("address");
                }
                if (this.district.value.length < 5) {
                    erros.push("district");
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
                    address: this.address.value,
                    num: this.num.value,
                    complement: this.complement.value,
                    city: this.city.value,
                    state: this.state.value.split("-")[0],
                    district: this.district.value,
                    birth_date: this.birth_date.value
                        .split("-")
                        .reverse()
                        .join("-"),
                    zip: this.zip.value,
                    phone: this.phone.value,
                };
                let res = await fetch(
                    `${api}/api/users/${localStorage.user_id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(_data),
                        headers: { "Content-type": "application/json" },
                    }
                );
                let {data} = await res.json();
                localStorage.email = data.email;
                localStorage.name = data.name;
                localStorage.nick = data.nick;
                localStorage.user_class = data.user_class;
                localStorage.user_id = data.id;
                document.querySelector("#content").innerHTML = router("/");
                logic("/");
            } catch (error) {
                console.log(error);
                if (
                    Object.prototype.toString.call(error) === "[object Array]"
                ) {
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

export default UpdateUser;

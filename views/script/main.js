const cadastro = {
    name: document.getElementById("namec"),
    email: document.getElementById("emailc"),
    nick: document.getElementById("nickc"),
    password: document.getElementById("passwordc"),
    address: document.getElementById("addressc"),
    num: document.getElementById("numc"),
    complement: document.getElementById("complementc"),
    city: document.getElementById("cityc"),
    state: document.getElementById("statec"),
    district: document.getElementById("districtc"),
    birth_date: document.getElementById("birth_datec"),
    zip: document.getElementById("zipc"),
    phone: document.getElementById("phonec"),
    submit: document.getElementById("submitc"),
};

cadastro.zip.addEventListener("keydown", (e) => {
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

cadastro.phone.addEventListener("keydown", function (e) {
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

cadastro.zip.addEventListener("keyup", async (e) => {
    if (e.target.value.length == 9) {
        const res = await fetch(
            `https://viacep.com.br/ws/${e.target.value}/json/`
        );
        const { localidade, uf, bairro } = await res.json();
        cadastro.district.value = bairro || "";
        getStates().then((data) => {
            cadastro.state.innerHTML = "";
            data.forEach(({ id, sigla, nome }) => {
                if (sigla == uf) {
                    cadastro.state.innerHTML += `<option value="${sigla}-${id}" selected>${nome}</option>`;
                } else {
                    cadastro.state.innerHTML += `<option value="${sigla}-${id}">${nome}</option>`;
                }
            });
            getCity(cadastro.state.value.split("-")[1]).then((data) => {
                cadastro.city.innerHTML = "";
                data.forEach(({ nome }) => {
                    if (localidade == nome) {
                        cadastro.city.innerHTML += `<option value="${nome}" selected>${nome}</option>`;
                    } else {
                        cadastro.city.innerHTML += `<option value="${nome}">${nome}</option>`;
                    }
                });
            });
        });
    }
});

async function getStates() {
    const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
    );
    const data = await res.json();
    return data;
}
getStates().then((data) => {
    data.forEach(({ id, sigla, nome }) => {
        cadastro.state.innerHTML += `
        <option value="${sigla}-${id}">${nome}</option>
        `;
    });
    getCity(cadastro.state.value.split("-")[1]).then((data) => {
        data.forEach(({ nome }) => {
            cadastro.city.innerHTML += `<option value="${nome}">${nome}</option>`;
        });
    });
});

async function getCity(_uf) {
    const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${_uf}/municipios`
    );
    const data = await res.json();
    return data;
}

cadastro.state.onchange = (evt) => {
    getCity(evt["target"].value.split("-")[1]).then((data) => {
        cadastro.city.innerHTML = "";
        data.forEach(({ nome }) => {
            cadastro.city.innerHTML += `<option value="${nome}">${nome}</option>`;
        });
    });
};

cadastro.submit.addEventListener("click", async () => {
    try {
        let erros = [];
        if (cadastro.name.value.length < 3) {
            erros.push("name");
        }
        if (cadastro.nick.value.length < 3) {
            erros.push("nick");
        }
        if (cadastro.password.value.length < 6) {
            erros.push("password");
        }
        if (cadastro.zip.value.length < 9) {
            erros.push("zip");
        }
        if (cadastro.phone.value.length < 15) {
            erros.push("phone");
        }
        if (
            !cadastro.email.checkValidity() ||
            cadastro.email.value.length == 0
        ) {
            erros.push("email");
        }
        if (!cadastro.address.checkValidity()) {
            erros.push("address");
        }
        if (!cadastro.district.checkValidity()) {
            erros.push("district");
        }
        if (cadastro.birth_date.value == "") {
            erros.push("birth_date");
        }
        if (!cadastro.num.checkValidity() || cadastro.num.valueAsNumber < 1) {
            erros.push("num");
        }

        if (erros.length > 0) {
            throw erros;
        }

        let _data = {
            name: cadastro.name.value,
            email: cadastro.email.value,
            nick: cadastro.nick.value,
            password: cadastro.password.value,
            address: cadastro.address.value,
            num: cadastro.num.value,
            complement: cadastro.complement.value,
            city: cadastro.city.value,
            state: cadastro.state.value.split("-")[0],
            district: cadastro.district.value,
            birth_date: cadastro.birth_date.value.split('-').reverse().join('-'),
            zip: cadastro.zip.value,
            phone: cadastro.phone.value,
        };
        await fetch("http://localhost:8000/api/users", {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json" },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                localStorage.setItem("jwt",json.token)
            })
            .catch((err) => console.log(err));
    } catch (error) {
        error.forEach((err) => {
            cadastro[err].classList.add("erro");
            setInterval(() => {
                cadastro[err].classList.remove("erro");
            }, 5000);
        });
    }
});

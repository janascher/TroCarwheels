import URL from "./url.js";
const api = new URL().apiUrl;
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Details {
    constructor() {
        this.offers = [];
        this.listDetail();
        this.ClickError()
    }
    listDetail() {
        fetch(`${api}/api/cart/${sessionStorage.infoId}`)
            .then((res) => {
                return res.json();
            })
            .then(({ data }) => {
                document.querySelector("img#imageCar").src =
                    "./uploads/" + data[0].link;
                document.querySelector("p.nameUser").innerHTML = data[0].nick;
                document.querySelector("p#colorCar").innerHTML = data[0].color;
                document.querySelector("p#description").innerHTML =
                    data[0].description;
                document.querySelector("h3#nomeCar").innerHTML = data[0].model;
            });

        fetch(`${api}/api/miniatures/own/user`)
            .then((res) => {
                return res.json();
            })
            .then(({ data }) => {
                document.querySelector(".carSelection").innerHTML = "";
                data.forEach((_dt) => {
                    document.querySelector(".carSelection").innerHTML += `
                <label class="infosCar">
                            <a target="_blank" href="./uploads/${_dt.link}">
                                <img class="basis-1" src="./uploads/${_dt.link}" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">${_dt.model}</p>
                            <button class="basis-1" type="button" data-id="${_dt.id}">Selecionar</button>
                        </label>
                `;
                });
                document.querySelector(".carSelection").innerHTML += `
            <div class="buttonSubmit">
                            <button type="submit">Enviar Proposta</button>
                        </div>
            `;
                this.choose();
                this.selectOffer();
            });
    }
    async choose() {
        document.querySelectorAll(".infosCar button").forEach((_el, key) => {
            _el.addEventListener("click", async (_evt) => {
                let index = this.offers.indexOf(Number(_evt.target.dataset.id));
                if (index > -1) {
                    this.offers.splice(index, 1);
                }
                await this.offers.push(Number(_evt.target.dataset.id));
                document
                    .querySelectorAll(".infosCar")
                    [key].classList.toggle("ok");
            });
        });
    }
    async selectOffer() {
        document
            .querySelector(".buttonSubmit button")
            .addEventListener("click", async () => {
                try {
                    if (!this.offers.length) {
                        throw "Escolha um elemento";
                    }
                    for (const id of this.offers) {
                        const _data = {
                            miniature_id: String(id),
                        };
                        let res = await fetch(
                            `${api}/api/cart_offer/${sessionStorage.infoId}`,
                            {
                                method: "POST",
                                body: JSON.stringify(_data),
                                headers: { "Content-type": "application/json" },
                            }
                        );
                        let { data } = await res.json();
                        console.log(data);
                        document.querySelector("#content").innerHTML =
                            router("/ad");
                        logic("/ad");
                    }
                } catch (err) {
                    let alert = document.getElementById("alert");
                    let message = document.getElementById("message");
                    message.innerHTML = err
                    document.getElementById("alert").style.display =
                            "flex";
                }
            });
    }
    ClickError(){
        document.getElementById("alert").addEventListener('click', ()=>{
            document.getElementById("alert").style.display = "none";
        })
    }
}

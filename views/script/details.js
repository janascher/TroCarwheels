import URL from "./url.js";
const api = new URL().apiUrl;
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Details {
    constructor() {
        this.offers = [];
        this.listDetail();
        this.ClickError();
        this.cancel();
        this.choose();
    }
    async findOffers(_id) {
        let res_cart_offer = await fetch(
            `${api}/api/cart_offer/${sessionStorage.infoId}`
        );
        let data_cart_offer = await res_cart_offer.json();
        let cart_offers = data_cart_offer.data;
        let filtro = cart_offers.find((mini) => {
            if (mini.miniature_id == _id) {
                return true;
            }
        });
        if (filtro) {
            return true;
        } else {
            return false;
        }
    }
    async Cart(_id){
        let res = await fetch(`${api}/api/cart_offer/cart/${_id}`);
        let {data}= await res.json();
        return data[0]?.cart_id
    }
    async listDetail() {
        document.querySelector(".carSelection").innerHTML = "";
        let res_cart = await fetch(`${api}/api/cart/${sessionStorage.infoId}`);
        let data_cart = await res_cart.json();
        let cart = data_cart.data;
        document.querySelector("img#imageCar").src =
            "./uploads/" + cart[0].link;
        document.querySelector("p.nameUser").innerHTML = cart[0].nick;
        document.querySelector("p#colorCar").innerHTML = cart[0].color;
        document.querySelector("p#description").innerHTML = cart[0].description;
        document.querySelector("h3#nomeCar").innerHTML = cart[0].model;
        let res_cart_offer = await fetch(`${api}/api/cart_offer/${sessionStorage.infoId}`);
        let data_cart_offer = await res_cart_offer.json();
        let cart_offers = data_cart_offer.data;

        let res_own = await fetch(`${api}/api/miniatures/own/user`);
        let data_own = await res_own.json();
        let own = data_own.data;

        for(let i=0;i<own.length;i++){
            let filtro = cart_offers.find((mini) => {
                if (mini.miniature_id == own[i].id) {
                    return true;
                }
            });

            let resCart = await fetch(`${api}/api/cart_offer/cart/${String(own[i].id)}`);
            let dataCart = await resCart.json();
            console.log(dataCart)
            let Cart = dataCart.data
            if (!filtro) {
                if(!Cart.length){
                    document.querySelector(".carSelection").innerHTML += `
                        <label class="infosCar">
                            <a target="_blank" href="./uploads/${own[i].link}">
                                <img class="basis-1" src="./uploads/${own[i].link}" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">${own[i].model}</p>
                            <button class="basis-1" type="button" data-id="${own[i].id}">Selecionar</button>
                        </label>
                    `;
                    this.choose();
                }
            } else {
                document.querySelector(".carSelection").innerHTML += `
                    <label class="infosCar">
                        <a target="_blank" href="./uploads/${own[i].link}">
                            <img class="basis-1" src="./uploads/${own[i].link}" alt="Fotografia" />
                        </a>                                    
                        <p class="basis-2">${own[i].model}</p>
                        <button class="cancel basis-1" type="button" data-id="${own[i].id}">Cancelar</button>
                    </label>
                `;
                await this.cancel();
            }
        }
            document.querySelector(".carSelection").innerHTML += `
                    <div class="buttonSubmit">
                        <button type="submit">Enviar Proposta</button>
                    </div>
            `;
            document.querySelectorAll(".infosCar button").forEach(async (_el, key) => {
                _el.addEventListener("click", async (_evt) => {
                    console.log(2)
                    let index = this.offers.indexOf(Number(_evt.target.dataset.id));
                    if (index > -1) {
                        this.offers.splice(index, 1);
                    } else {
                        await this.offers.push(Number(_evt.target.dataset.id));
                    }
    
                    document
                        .querySelectorAll(".infosCar")
                        [key].classList.toggle("ok");
                });
            });
            document.querySelectorAll("button.cancel").forEach(async (_el) => {
            _el.addEventListener("click", async (_evt) => {
                console.log(_evt);
                try {
                    let id = _evt.target.dataset.id;
                    let res = await fetch(
                        `${api}/api/cart_offer/${sessionStorage.infoId}/${localStorage.user_id}/${id}`,
                        {
                            method: "DELETE",
                            headers: { "Content-type": "application/json" },
                        }
                    );
                    let json = await res.json();
                    console.log(json);
                    document.querySelector("#content").innerHTML =
                        router("/ad");
                    logic("/ad");
                } catch (err) {
                    console.log(err);
                }
            });
        });
            await this.selectOffer();
    }
    async choose() {
        document.querySelectorAll(".infosCar button").forEach(async (_el, key) => {
            console.log(1)
            _el.addEventListener("click", async (_evt) => {
                console.log(2)
                let index = this.offers.indexOf(Number(_evt.target.dataset.id));
                if (index > -1) {
                    this.offers.splice(index, 1);
                } else {
                    await this.offers.push(Number(_evt.target.dataset.id));
                }

                document
                    .querySelectorAll(".infosCar")
                    [key].classList.toggle("ok");
            });
        });
    }
    async cancel() {
        document.querySelectorAll("button.cancel").forEach(async (_el) => {
            _el.addEventListener("click", async (_evt) => {
                console.log(_evt);
                try {
                    let id = _evt.target.dataset.id;
                    let res = await fetch(
                        `${api}/api/cart_offer/${sessionStorage.infoId}/${localStorage.user_id}/${id}`,
                        {
                            method: "DELETE",
                            headers: { "Content-type": "application/json" },
                        }
                    );
                    let json = await res.json();
                    console.log(json);
                    document.querySelector("#content").innerHTML =
                        router("/ad");
                    logic("/ad");
                } catch (err) {
                    console.log(err);
                }
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
                    message.innerHTML = err;
                    document.getElementById("alert").style.display = "flex";
                }
            });
    }

    ClickError() {
        document.getElementById("alert").addEventListener("click", () => {
            document.getElementById("alert").style.display = "none";
        });
    }
}

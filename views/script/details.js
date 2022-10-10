import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Details {
    constructor() {
        this.listDetail();
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
                            <input type="radio" id="offer" name="offer" value="${_dt.id}" />
                                <img class="basis-1" src="./uploads/${_dt.link}" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">${_dt.model}</p>
                            <button class="basis-1" type="button">Selecionar</button>
                        </label>
                `;
                });
                document.querySelector(".carSelection").innerHTML += `
            <div class="buttonSubmit">
                            <button type="submit">Enviar Proposta</button>
                        </div>
            `;
                this.selectOffer();
            });
    }
    selectOffer() {
        document
            .querySelector(".buttonSubmit button")
            .addEventListener("click", () => {
                const id = document.querySelector(
                    'input[name="offer"]:checked'
                ).value;
                const _data={
                    miniature_id:id
                }
                fetch(`${api}/api/cart_offer/${sessionStorage.infoId}`, {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: { "Content-type": "application/json" },
                })
                .then(res=>{
                    return res.json()
                })
                .then(({data})=>{
                    console.log(data)
                    document.querySelector("#content").innerHTML = router("/ad")
                    logic("/ad")
                })
            });
    }
}

import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Confirmation {
    constructor() {
        this.data = {
            user_id1:null,
            miniature_id1:null,
            user_id2:null,
            miniature_id2:null,
            cart_id:null
        }
        this.list();
    }
    list() {
        fetch(`${api}/api/cart/${sessionStorage.infoId}`)
            .then((res) => {
                return res.json();
            })
            .then(({ data }) => {
                console.log(data)
                this.data.cart_id = String(data[0].id)
                this.data.user_id1 = String(data[0].user_id)
                this.data.miniature_id1 = String(data[0].miniature_id)
                document.querySelector("img#imageCar").src =
                    "./uploads/" + data[0].link;
                document.querySelector("p.nameUser").innerHTML = data[0].nick;
                document.querySelector("p#colorCar").innerHTML = data[0].color;
                document.querySelector("p#description").innerHTML =
                    data[0].description;
                document.querySelector("h3#nomeCar").innerHTML = data[0].model;
            });

        fetch(`${api}/api/cart_offer/${sessionStorage.infoId}`)
            .then((res) => {
                return res.json();
            })
            .then(({ data }) => {
                console.log(data)
                document.querySelector(".carSelection").innerHTML = "";
                data.forEach((_dt) => {
                    document.querySelector(".carSelection").innerHTML += `
                <label class="infosCar">
                            <a target="_blank" href="./uploads/${_dt.link}">
                            <input type="radio" id="offer" name="offer" value="${_dt.miniature_id}-${_dt.user_id}" />
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
                const [id,user] = document.querySelector(
                    'input[name="offer"]:checked'
                ).value.split("-");
                this.data.user_id2 = String(user);
                this.data.miniature_id2 = id;
                console.log(this.data)
                fetch(`${api}/api/exchanges/`, {
                    method: "POST",
                    body: JSON.stringify(this.data),
                    headers: { "Content-type": "application/json" },
                })
                .then(res=>{
                    return res.json()
                })
                .then(({data})=>{
                    console.log(id)
                    fetch(`${api}/api/exchanges/close/${data[0]}`,{
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                    }).then(()=>{
                        document.querySelector("#content").innerHTML = router("/")
                        logic("/")
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            });
    }
}

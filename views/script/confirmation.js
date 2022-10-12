import URL from "./url.js";
const api = new URL().apiUrl;
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Confirmation {
    constructor() {
        this.offers=[]
        this.data = {
            user_id1: null,
            miniature_id1: null,
            user_id2: null,
            miniature_id2: null,
            cart_id: null,
        };
        this.list();
    }
    list() {
        fetch(`${api}/api/cart/${sessionStorage.infoId}`)
            .then((res) => {
                return res.json();
            })
            .then(({ data }) => {
                console.log(data)
                this.data.cart_id = String(data[0].id);
                this.data.user_id1 = String(data[0].user_id);
                this.data.miniature_id1 = String(data[0].miniature_id);
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
                document.querySelector(".carSelection").innerHTML = "";
                data.forEach((_dt) => {
                    document.querySelector(".carSelection").innerHTML += `
                <label class="infosCar">
                            <a target="_blank" href="./uploads/${_dt.link}">
                                <img class="basis-1" src="./uploads/${_dt.link}" alt="Fotografia" />
                            </a>                                    
                            <p class="basis-2">${_dt.model}</p>
                            <button id="btn-offers" class="basis-1" type="button" data-id="${_dt.miniature_id}" data-user="${_dt.user_id}">Selecionar</button>
                        </label>
                `;
                });
                document.querySelector(".carSelection").innerHTML += `
            <div class="buttonSubmit">
                            <button type="submit">Confirmar Proposta</button>
                        </div>
            `;
                this.submit();
                this.selectOffer();
            });
    }

    async selectOffer(){
        document.querySelectorAll('button#btn-offers').forEach(async (_el,key)=>{
            _el.addEventListener('click',async (_evt)=>{
                document.querySelectorAll('label.infosCar').forEach((_el)=>{
                    _el.classList.remove('yes')
                })
                document.querySelectorAll('label.infosCar')[key].classList.add('yes')
                this.data.user_id2 = String(_evt.target.dataset.user);
                this.data.miniature_id2 = String(_evt.target.dataset.id);
            })
        })
    }

    submit() {
        document
            .querySelector(".buttonSubmit button")
            .addEventListener("click", async () => {
                try{
                    console.log(this.data);
                    let res = await fetch(`${api}/api/exchanges/`, {
                        method: "POST",
                        body: JSON.stringify(this.data),
                        headers: { "Content-type": "application/json" },
                    });
                    let { data } = await res.json();
                    let res1 = await fetch(`${api}/api/exchanges/close/${data}`,{
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                    })
                    let data1 = await res1.json();
                    console.log(data1)
                    document.querySelector("#content").innerHTML = router("/historic");
                    logic("/historic");
                }catch(err){
                    console.log(err)
                }
            });
    }
}

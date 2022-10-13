import URL from "./url.js";
const api = new URL().apiUrl;
import { router } from "../router.js";
import { logic } from "../logic.js";
class Home {
    constructor() {
        this.ctn = document.getElementById("home_cars_container");
        this.pub = document.querySelectorAll("button#publish");
        this.cookies = document.cookie.split("; ").reduce((prev, current) => {
            const [name, ...value] = current.split("=");
            prev[name] = value.join("=");
            return prev;
        }, {});
        this.listMiniatures();
    }
    publish() {
        document.querySelectorAll("button#publish").forEach((el) => {
            el.addEventListener("click", async function (_evt) {
                try{
                    let res = await fetch(`${api}/api/miniatures/makeavailable/${_evt.target.dataset.id}`, {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                    });
                    let {data} = await res.json();
                    document.querySelector("#content").innerHTML = await router("/ad");
                    await logic("/ad");
                }catch(err){
                    console.log(err)
                }
            });
        });
    }
    viewOffer() {
        document.querySelectorAll("button#offer").forEach((el) => {
            el.addEventListener("click", function (_evt) {
                fetch(`${api}/api/cart/find/${_evt.target.dataset.id}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then(({ data }) => {
                        sessionStorage.infoId = data[0].id;
                        document.querySelector("#content").innerHTML =
                            router("/confirmation");
                        logic("/confirmation");
                    });
            });
        });
    }
    viewCart() {
        document.querySelectorAll("button#viewCart").forEach((el) => {
            el.addEventListener("click", function (_evt) {
                sessionStorage.infoId = _evt.target.dataset.id
                document.querySelector("#content").innerHTML =router("/details");
                logic("/details");
            });
        });
    }
    update() {
        document.querySelectorAll('ion-icon[name="create"]').forEach((_el)=>{
            _el.addEventListener('click', async (_evt)=>{
                sessionStorage.infoId = _evt.target.dataset.id
                document.querySelector("#content").innerHTML = await router("/update-car");
                await logic("/update-car");
            })
        })
    }
    delete() {
        document.querySelectorAll('ion-icon[name="close"]').forEach((_el)=>{
            _el.addEventListener('click', async (_evt)=>{
                try{
                    let resCart = await fetch(`${api}/api/cart/find/${_evt.target.dataset.id}`);
                    let dataCart = await resCart.json();
                    let Cart = dataCart?.data[0]?.id;
                    if(Cart){
                        await fetch(`${api}/api/cart/${Cart}`,{
                            method: "DELETE",
                            headers: { "Content-type": "application/json"}
                        })
                    }
                    await fetch(`${api}/api/miniatures/${_evt.target.dataset.id}`,{
                        method: "DELETE",
                        headers: { "Content-type": "application/json"}
                    })
    
                    document.querySelector("#content").innerHTML = await router("/");
                    await logic("/");
                }catch(err){
                    console.log(err)
                }
            })
        })
    }
    async Cart(_id){
        let res = await fetch(`${api}/api/cart_offer/cart/${_id}`);
        let {data}= await res.json();
        return data[0]?.cart_id
    }
    async listMiniatures() {
        try {
            if (this.cookies.auth) {
                document.querySelector("nav #user span").innerHTML = localStorage.nick;
                let res = await fetch(`${api}/api/miniatures/own/user`);
                let { data } = await res.json();
                document.getElementById("home_cars_container").innerHTML = "";
                for(let i= 0; i<data.length; i++){
                    let {id, link, model, nick, status} = data[i]
                    let isOffer = await this.Cart(id)

                    if (status == 20) {
                        document.getElementById(
                            "home_cars_container"
                        ).innerHTML += `<div class="card" id="car_container1">
                            <ion-icon name="close" data-id="${id}"></ion-icon>
                            <ion-icon name="create" data-id="${id}"></ion-icon>
                            <img class="card_images" id="card_one" style="background:url(./uploads/${link});background-repeat:no-repeat;
                            background-size:contain;
                                background-position:center;">
                                <div class="card_cars">
                                    <h1>${model}</h1>
                                    <p>@${nick}</p>
                                    <button id="offer" data-id="${id}">Ofertas</button>
                                </div>
                            </div>`;
                    } else if (status == 10) {
                        if(isOffer){
                            console.log(isOffer)
                            document.getElementById(
                                "home_cars_container"
                            ).innerHTML += `<div class="card" id="car_container1">
                            <ion-icon name="close" data-id="${id}"></ion-icon>
                            <ion-icon name="create" data-id="${id}"></ion-icon>
                                <img class="card_images" id="card_one" style="background:url(./uploads/${link});background-repeat:no-repeat;
                                background-size:contain;
                                    background-position:center;">
                                    <div class="card_cars">
                                        <h1>${model}</h1>
                                        <p>@${nick}</p>
                                        <button id="viewCart" data-id="${isOffer}">Já Ofertado</button>
                                    </div>
                                </div>`;

                        }else{
                            document.getElementById(
                                "home_cars_container"
                            ).innerHTML += `<div class="card" id="car_container1">
                            <ion-icon name="close" data-id="${id}"></ion-icon>
                            <ion-icon name="create" data-id="${id}"></ion-icon>
                                <img class="card_images" id="card_one" style="background:url(./uploads/${link});background-repeat:no-repeat;
                                background-size:contain;
                                    background-position:center;">
                                    <div class="card_cars">
                                        <h1>${model}</h1>
                                        <p>@${nick}</p>
                                        <button id="publish" data-id="${id}">Trocar</button>
                                    </div>
                                </div>`;
                        }
                    }
                }
            }else{
                document.getElementById(
                    "home_cars_container"
                ).style.display="none"
            }
            this.update();
            this.delete();
            this.publish();
            this.viewCart();
            this.viewOffer();
        } catch (err) {
            console.log(err);
        }
    }
}
export default Home;

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
            el.addEventListener("click", function (_evt) {
                fetch(`${api}/api/miniatures/makeavailable/${_evt.target.dataset.id}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                })
                .catch(err=>console.log(err));
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
    async listMiniatures() {
        try {
            if (this.cookies.auth) {
                let res = await fetch(`${api}/api/miniatures/own/user`);
                let { data } = await res.json();
                document.getElementById("home_cars_container").innerHTML = "";
                data.forEach(function ({ id, link, model, nick, status }) {
                    if (status == 20) {
                        document.getElementById(
                            "home_cars_container"
                        ).innerHTML += `<div class="card" id="car_container1">
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
                        document.getElementById(
                            "home_cars_container"
                        ).innerHTML += `<div class="card" id="car_container1">
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
                });
            }
            this.publish();
            this.viewOffer();
        } catch (err) {
            console.log(err);
        }
    }
}
export default Home;

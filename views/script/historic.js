import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Hitoric{
    constructor(){
        this.listCarsHistoric()
    }
    async listCarsHistoric() {
        let res = await fetch(`${api}/api/exchanges/user/${localStorage.user_id}`);
        let {data} = await res.json()
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            console.log(i)
            document.getElementById('main').innerHTML += `
    <div class="cars_container">
        <header class="header_car">
            <p class="status">Troca Efetuada</p>
            <p class="date">${data[i]['created_at']}</p>
            <p class="code_id">Cod: ${data[i]['id']}</p>
        </header>
        <main class="main_car">
            <div class="car_1_exchange">
                <img class="car1_img" src="./uploads/${data[i]['link1']}"/>
                <p class="p1">${data[i]['description1']}</p>
                <p class="p2">${data[i]['nick1']}</p>
                <p class="p3">Marca: ${data[i]['brand1']}</p>
                <p class="p4">Cor: ${data[i]['color1']}</p>
            </div>
            <div class="arrows"></div>
            <div class="car_2_exchange">
                <img class="car2_img" src="./uploads/${data[i]['link2']}" />
                <p class="p1">${data[i]['description2']}</p>
                <p class="p2">${data[i]['nick2']}</p>
                <p class="p3">Marca: ${data[i]['brand2']}</p>
                <p class="p4">Cor: ${data[i]['color2']}</p>
            </div>
        </main>
    </div>`
        }
    }
}
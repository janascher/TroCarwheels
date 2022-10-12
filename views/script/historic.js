import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Hitoric{
    #data
    constructor(){
        this.listCarsHistoric();
        this.filter();
        this.#data=[];
    }


    async listCarsHistoric() {
        try{
            const filter = document.getElementById('select').value;
            let res = await fetch(`${api}/api/exchanges/user/${localStorage.user_id}/?search=${filter}`);
            this.#data = await res.json();
            this.list();
        }catch(err){
            console.log(err)
        }    
    }

    async filter(){
        try{
            document.getElementById('select').addEventListener('change', async ()=>{
                const search = document.getElementById('select').value;
                let res = await fetch(`${api}/api/exchanges/user/${localStorage.user_id}/?search=${search}`);
                this.#data = await res.json();
                this.list();
            })
        }catch(err){
            console.log(err)
        }    
    }       
 
    list(){
        document.getElementById('main').innerHTML = ''
        for(let i = 0; i < this.#data.data.length; i++) {
            const dt = new Date(this.#data.data[i]['created_at']);

            document.getElementById('main').innerHTML += `
            <div class="cars_container">
                <header class="header_car">
                    <p class="status">Troca Efetuada</p>
                    <p class="date">${dt.toLocaleString()}</p>
                    <p class="code_id">Cod: ${this.#data.data[i]['id']}</p>
                </header>
                <main class="main_car">
                    <div class="car_1_exchange">
                        <img class="car1_img" src="./uploads/${this.#data.data[i]['link1']}"/>
                        <h1 class="p1">${this.#data.data[i]['description1']}</h1>
                        <p class="p2">@${this.#data.data[i]['nick1']}</p>
                        <p class="p3">Marca: ${this.#data.data[i]['brand1']}</p>
                        <p class="p4">Cor: ${this.#data.data[i]['color1']}</p>
                    </div>
                    <div class="arrows"></div>
                    <div class="car_2_exchange">
                        <img class="car2_img" src="./uploads/${this.#data.data[i]['link2']}" />
                        <h1 class="p1B">${this.#data.data[i]['description2']}</h1>
                        <p class="p2">@${this.#data.data[i]['nick2']}</p>
                        <p class="p3">Marca: ${this.#data.data[i]['brand2']}</p>
                        <p class="p4">Cor: ${this.#data.data[i]['color2']}</p>
                    </div>
                </main>
            </div>`
        };

    }
}
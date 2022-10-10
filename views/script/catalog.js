import URL from "./url.js";
const api = new URL().apiUrl
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Catalog {
    
    constructor() {
        this.carsContainer = document.querySelector("#cars_container");
        this.cars = document.querySelector("#cars");
        this.listCars()
    }


    listCars(){
        fetch(`${api}/api/cart`)
        .then(res=>res.json())
        .then(({data})=>{
            for (let i = 0; i < data.length; i++) {
                if (data[i].user_id!=localStorage.user_id) {
                    this.cars.innerHTML += `<div class="cars">
                    <img class="car_images" src="./uploads/${data[i]["link"]}"/> 
                    <div class="card_cars">
                    <p>${data[i]["model"]} </p>
                    <p>@${data[i]["nick"]} </p>
                    </div>
                    <button class="button_details" data-id="${data[i].id}"> Detalhes </button>
                    </div>`;
                }
            }
            this.detail()
        }).catch(err=>console.log(err))
    }


    detail(){
        document.querySelectorAll("button.button_details").forEach((_el)=>{
            _el.addEventListener('click', function(_evt){
                sessionStorage.infoId = _evt.target.dataset.id
                document.querySelector("#content").innerHTML = router("/details")
                logic("/details")
            })
        })
    }


    async search(){
        try{
            let res = await fetch(`${api}/api/cart`);
            let {data} = await res.json()
            let search = ""
            const regex = new RegExp(`//search//`, 'gi');
            const filtro = data.filter(({dt}) => dt.model.match(regex));
            console.log(filtro);
            for (let i = 0; i < filtro.length; i++) {
                if (filtro[i].user_id!=localStorage.user_id) {
                    this.cars.innerHTML += `<div class="cars">
                    <img class="car_images" src="./uploads/${filtro[i]["link"]}"/> 
                    <div class="card_cars">
                    <p>${filtro[i]["model"]} </p>
                    <p>@${filtro[i]["nick"]} </p>
                    </div>
                    <button class="button_details" data-id="${filtro[i].id}"> Detalhes </button>
                    </div>`;
                }
            }
            this.detail()

        }catch(err){
            console.log(err)
        }
    }
}
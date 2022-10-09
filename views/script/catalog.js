import api_url from "../index.js";
import { router } from "../router.js";
import { logic } from "../logic.js";
export default class Catalog {
    constructor() {
        this.carsContainer = document.querySelector("#cars_container");
        this.cars = document.querySelector("#cars");

        this.listCars()
    }
    listCars(){
        fetch(`${api_url.apiUrl}/api/cart`)
        .then(res=>res.json())
        .then(({data})=>{
            for (let i = 0; i < data.length; i++) {
                this.cars.innerHTML += `<div class="cars">
                <img class="car_images" src="./uploads/${data[i]["link"]}"/> 
                <div class="card_cars">
                <p>${data[i]["model"]} </p>
                <p>@${data[i]["nick"]} </p>
                </div>
                <button class="button_details" data-id="${data[i].id}"> Detalhes </button>
                </div>`;
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
}
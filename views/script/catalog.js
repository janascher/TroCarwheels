export default class Catalog {
    constructor() {
        this.carsArray = [
            {
                carName: "Camaro",
                carUser: "user1",
                carImg: "./assets/img/home/car_1.jpg",
                carID: "1",
            },
            {
                carName: "Ford",
                carUser: "user2",
                carImg: "./assets/img/home/car_3.jpg",
                carID: "2",
            },
            {
                carName: "Fiat",
                carUser: "user44",
                carImg: "./assets/img/home/car_5.jpg",
                carID: "33",
            },
            {
                carName: "Palio",
                carUser: "user4",
                carImg: "./assets/img/home/car_7.jpg",
                carID: "4",
            },
            {
                carName: "Camaro",
                carUser: "user9",
                carImg: "./assets/img/home/car_9.jpg",
                carID: "9",
            },
            {
                carName: "Camaro",
                carUser: "user9",
                carImg: "./assets/img/home/car_6.jpg",
                carID: "11",
            },
        ];
        this.carsContainer = document.querySelector("#cars_container");
        this.cars = document.querySelector("#cars");

        this.listCars()
    }
    listCars(){
        fetch("http://localhost:8000/api/cart")
        .then(res=>res.json())
        .then(({data})=>{
            console.log(data)
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
            })
        })
    }
}
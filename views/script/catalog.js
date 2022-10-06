let carsArray = [{
    carName: 'Camaro',
    carUser: 'user1',
    carImg: './assets/img/home/car_1.jpg',
    carID: '1'
},
{
    carName: 'Ford',
    carUser: 'user2',
    carImg: './assets/img/home/car_3.jpg',
    carID: '2'
},
{
    carName: 'Fiat',
    carUser: 'user44',
    carImg: './assets/img/home/car_5.jpg',
    carID: '33'
},
{
    carName: 'Palio',
    carUser: 'user4',
    carImg: './assets/img/home/car_7.jpg',
    carID: '4'
},
{
    carName: 'Camaro',
    carUser: 'user9',
    carImg: './assets/img/home/car_9.jpg',
    carID: '9'
},
{
    carName: 'Camaro',
    carUser: 'user9',
    carImg: './assets/img/home/car_6.jpg',
    carID: '11'
},
]
const carsContainer = document.querySelector('#cars_container');
let cars = document.querySelector('#cars');

let listCars = () => {
    for (let i = 0; i < carsArray.length; i++) {
        cars.innerHTML += `<div class="cars">
        <img class="car_images" src="${carsArray[i]['carImg']}"/> 
        <div class="card_cars">
            <p>${carsArray[i]['carName']} </p>
            <p> ${carsArray[i]['carUser']} </p>
        </div>
        <button class="button_details"> Detalhes </button>
        </div>`
    }
};
listCars();